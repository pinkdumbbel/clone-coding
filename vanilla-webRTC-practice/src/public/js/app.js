const socket = io();

const $myFace = document.querySelector('#myFace');
const $peerFace = document.querySelector('#peerFace');

const $muteBtn = document.querySelector('#mute');
const $cameraOffBtn = document.querySelector('#camera');

const $camerasSelect = document.querySelector('#cameras');

const $welcome = document.querySelector('#welcome');
const $call = document.querySelector('#call');

const $enterRoomForm = $welcome.querySelector('form');

$call.hidden = true;

let mute = false;
let cameraOff = false;
let myStream;
let roomName;
let myPeerConnection;

/* const getCameras = async () => {
    try {
        const cameraList = await navigator.mediaDevices.enumerateDevices();
        cameraList.
            filter(cam => cam.kind === 'videoinput').
            forEach(cam => {
                const $option = document.createElement('option');
                $option.value = cam.deviceId;
                $option.innerText = cam.label;
                $camerasSelect.appendChild($option);
            });
    } catch (e) {
        console.log(e);
    }
}; */

const getMedia = async () => {
    try {
        myStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { facingMode: "user" },
        });
        $myFace.srcObject = myStream;
        //await getCameras();
    } catch (e) {
        console.log(e);
    }
};

//RTC PEER
const makeConnection = () => {
    myPeerConnection = new RTCPeerConnection({
        iceServers: [
            {
                urls: [
                    "stun:stun.l.google.com:19302",
                    "stun:stun1.l.google.com:19302",
                    "stun:stun2.l.google.com:19302",
                    "stun:stun3.l.google.com:19302",
                    "stun:stun4.l.google.com:19302",
                ],
            },
        ],
    });
    myPeerConnection.addEventListener('icecandidate', (data) => {
        socket.emit('icecandidate', data.candidate, roomName);
    });
    myPeerConnection.addEventListener('addstream', (data) => {
        $peerFace.srcObject = data.stream;
        console.log(data.stream);
    });
    myStream
        .getTracks()
        .forEach((track) => myPeerConnection.addTrack(track, myStream));
};

const initCall = async () => {
    console.log('init');
    $call.hidden = false;
    $welcome.hidden = true;
    await getMedia();
    makeConnection();
};

const handleMute = () => {
    myStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
    });
    if (!mute) {
        mute = true;
        $muteBtn.innerText = 'UnMute';
    } else {
        mute = false;
        $muteBtn.innerText = 'Mute';
    }
};

const handleCamera = () => {
    myStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
    });
    if (!cameraOff) {
        cameraOff = true;
        $cameraOffBtn.innerText = 'CameraOn';
    } else {
        cameraOff = false;
        $cameraOffBtn.innerText = 'CameraOff';
    }
};

const handleEnterRoom = async (e) => {
    e.preventDefault();
    const $input = $enterRoomForm.querySelector('input');
    await initCall();
    socket.emit('enterroom', $input.value);
    roomName = $input.value;
    $input.value = '';
};
/* const handleCameraChange = () => {
    console.log($camerasSelect.value);
}; */

$muteBtn.addEventListener('click', handleMute);
$cameraOffBtn.addEventListener('click', handleCamera);
//$camerasSelect.addEventListener('input', handleCameraChange);
$enterRoomForm.addEventListener('submit', handleEnterRoom);
//getMedia();

//socket
socket.on('welcome', async () => {
    const offer = await myPeerConnection.createOffer();
    myPeerConnection.setLocalDescription(offer);
    socket.emit('offer', offer, roomName);
});

socket.on('offer', async (offer) => {
    myPeerConnection.setRemoteDescription(offer);
    const answer = await myPeerConnection.createAnswer();
    myPeerConnection.setLocalDescription(answer);
    socket.emit('answer', answer, roomName);
});

socket.on('answer', (answer) => {
    myPeerConnection.setRemoteDescription(answer);
});

socket.on('icecandidate', (icecandidate) => {
    myPeerConnection.addIceCandidate(icecandidate);
});