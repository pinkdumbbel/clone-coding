import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
const app = express();

app.set('view engine', "pug");
app.set('views', __dirname + '/views/');
app.use("/public", express.static(__dirname + "/public"));
app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/'));
//app.listen(3000);

const server = http.createServer(app);
const io = SocketIO(server);

io.on('connection', (socket) => {
    socket.on('enter_room', ({ payload: roomName }, done) => {
        socket.join(roomName);
        done(roomName);
        socket.to(roomName).emit('welcome', 'someone joined!');
    });
});
server.listen(3000);
console.log('...listening http://localhost:3000/');



