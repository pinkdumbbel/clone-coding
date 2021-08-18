import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
const app = express();

app.set('view engine', "pug");
app.set('views', __dirname + '/views/');
app.use("/public", express.static(__dirname + "/public"));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));
//app.listen(3000);

const server = http.createServer(app);
const io = SocketIO(server);
const publicRooms = () => {
    const { rooms, sids } = io.sockets.adapter;
    const roomList = [];

    rooms.forEach((_, key) => {
        if (sids.get(key) === undefined) {
            roomList.push(key);
        }
    });

    return roomList;
};

const counter = (roomName) => io.sockets.adapter.rooms.get(roomName)?.size;

io.on('connection', (socket) => {
    socket['nickname'] = 'anonymouse';
    io.sockets.emit("roomChange", publicRooms());

    socket.on('enter_room', ({ payload: roomName }, done) => {
        socket.join(roomName);
        done(roomName, counter(roomName));
        socket.to(roomName).emit('welcome', 'joined!', socket.nickname);
        socket.to(roomName).emit('counter', roomName, counter(roomName));
        io.sockets.emit("roomChange", publicRooms());
    });

    socket.on('message', (message, roomName, done) => {
        socket.to(roomName).emit('message', message, socket.nickname);
        done(message, socket.nickname);
    });

    socket.on('nickname', nickName => socket['nickname'] = nickName);

    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => {
            socket.to(room).emit('counter', room, counter(room) - 1);
            socket.to(room).emit('leave', 'left! ㅠㅠ', socket.nickname);
        });
    });

    socket.on('disconnect', () => {
        io.emit('roomChange', publicRooms());
    });

});
server.listen(3000);
console.log('...listening http://localhost:3000/');



