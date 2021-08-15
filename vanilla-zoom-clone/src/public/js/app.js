const messageForm = document.querySelector('#message');
const nicknameForm = document.querySelector('#nickname');
const messageList = document.querySelector('ul');
const socket = new WebSocket(`ws://${window.location.host}`);

const dataToJson = (type, payload) => {
    const sendData = { type, payload };
    return JSON.stringify(sendData);
};

//socket.addEventListener 서버로 부터 response받는부분
socket.addEventListener('open', () => {
    console.log('Connected to Server!!');
});

socket.addEventListener('message', (socket) => {
    console.log(socket.nickname);
    const messageItem = document.createElement('li');
    messageItem.innerText = socket.data;
    messageList.append(messageItem);
});

socket.addEventListener('close', () => {
    console.log('Disconnected to Server...');
});

const sendData = (type, $input) => {
    socket.send(dataToJson(type, $input.value));
    $input.value = '';
};

nicknameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const $input = nicknameForm.querySelector('input');
    sendData('nickname', $input);
});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const $input = messageForm.querySelector('input');
    sendData('message', $input);
});
//서버로 요청보내는 부분socket.onopen = () => socket.send('Hello Server!!!');
