const socket = io();

const $welcome = document.querySelector('#welcome');
const $welcomeForm = $welcome.querySelector('form');
const $room = document.querySelector('#room');

$room.hidden = true;

const createRoom = (roomName) => {
    $welcome.hidden = true;
    $room.hidden = false;
    const $roomName = document.createElement('h3');
    $roomName.innerText = `Room: ${roomName}`;
    $room.prepend($roomName);
};

const welcomeRoom = (message) => {
    const $ul = document.querySelector('ul');
    const $li = document.createElement('li');
    $li.innerText = message;
    $ul.append($li);
};

$welcomeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const $input = $welcomeForm.querySelector('input');
    socket.emit('enter_room', { payload: $input.value }, createRoom);
    $input.value = '';
});

socket.on('welcome', welcomeRoom);