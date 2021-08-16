import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const app = express();

app.set('view engine', "pug");
app.set('views', __dirname + '/views/');
app.use("/public", express.static(__dirname + "/public"));
app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/'));
//app.listen(3000);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const sockets = [];
wss.on('connection', (socket) => {
    socket['nickname'] = 'anonymous';
    sockets.push(socket);
    console.log('Connected to Browser');
    //브라우저로부터 요청 받음
    socket.on('message', (message) => {
        const parsed = JSON.parse(message);
        switch (parsed.type) {
            case 'nickname':
                socket['nickname'] = parsed.payload;
                break;
            case 'message':
                //브라우저에 응답 보냄
                sockets.forEach((soc) => soc.send(`${socket.nickname}: ${parsed.payload}`));
                break;
        }
    });
    socket.on('close', () => console.log('Disconnected to Browser'));
});
server.listen(3000);
console.log('...listening http://localhost:3000/');



