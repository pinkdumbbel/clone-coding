const socket = io();

const $myFace = document.querySelector('#myFace');
const $muteBtn = document.querySelector('#mute');
const $cameraOffBtn = document.querySelector('#cameraOff');
const $camerasSelect = document.querySelector('#cameras');
const $welcome = document.querySelector('#welcome');
const $call = document.querySelector('#call');

const $enterRoomForm = $welcome.querySelector('form');

$call.hidden = true;
let mute = false;
let cameraOff = false;
let myStream;
let roomName;

const getCameras = async () => {
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
};

const getMedia = async () => {
    try {
        myStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        $myFace.srcObject = myStream;
        getCameras();
    } catch (e) {
        console.log(e);
    }
};

const startMedia = async () => {
    $call.hidden = false;
    $welcome.hidden = true;
    await getMedia();
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

const handleEnterRoom = (e) => {
    e.preventDefault();
    const $input = $enterRoomForm.querySelector('input');
    socket.emit('EnterRoom', $input.value, startMedia);
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