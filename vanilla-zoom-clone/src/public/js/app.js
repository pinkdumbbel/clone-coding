const socket = io();

//formWrapper
const $welcome = document.querySelector('#welcome');
const $room = document.querySelector('#room');

//form
const $nicknameForm = $welcome.querySelectorAll('form')[0];
const $welcomeForm = $welcome.querySelectorAll('form')[1];
const $messageForm = $room.querySelector('#message');

let roomName;

$room.hidden = true;

const enterRoom = (room, userCnt) => {
    //roomName = room;
    $welcome.hidden = true;
    $room.hidden = false;
    const $roomTitle = $room.querySelector('h3');
    $roomTitle.innerText = `Room: ${room}(${userCnt})`;
    $room.prepend($roomTitle);
};

const addMessage = (message, nickName = '') => {
    const $ul = $room.querySelector('ul');
    const $li = document.createElement('li');
    $li.innerText = `${nickName ? nickName : 'anonymouse'}: ${message}`;
    $ul.append($li);
};

const roomList = (rooms) => {
    const $ul = $welcome.querySelector('ul');
    $ul.innerHTML = '';
    if (rooms.length === 0) return;
    rooms.forEach((room) => {
        const $li = document.createElement('li');
        $li.innerText = room;
        $ul.append($li);
        console.dir($ul);
    });
};

$welcomeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const $input = $welcomeForm.querySelector('input');
    socket.emit('enter_room', { payload: $input.value }, enterRoom);
    $input.value = '';
});

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const $input = $messageForm.querySelector('input');
    const value = $input.value;
    socket.emit('message', value, roomName, addMessage);
    $input.value = '';

});

$nicknameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const $input = $nicknameForm.querySelector('input');
    socket.emit('nickname', $input.value);
});

socket.on('welcome', addMessage);
socket.on('leave', addMessage);
socket.on('message', addMessage);
socket.on('roomChange', roomList);
socket.on('counter', enterRoom);