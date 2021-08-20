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

io.on('connection', (socket) => {
    socket.on('enterroom', (roomName) => {
        socket.join(roomName);
        socket.to(roomName).emit('welcome');
    });

    socket.on('offer', (offer, roomName) => {
        socket.to(roomName).emit('offer', offer);
    });

    socket.on('answer', (answer, roomName) => {
        socket.to(roomName).emit('answer', answer);
    });

    socket.on('icecandidate', (icecandidate, roomName) => {
        socket.to(roomName).emit('icecandidate', icecandidate);
    });
});

server.listen(3000);
console.log('...listening http://localhost:3000/');
