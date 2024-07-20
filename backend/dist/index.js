"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
const app = (0, express_1.default)();
const httpserver = app.listen(300);
const wss = new ws_1.WebSocketServer({ server: httpserver });
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    const clientColor = getRandomColor();
    ws.send(JSON.stringify({ type: 'color', color: clientColor }));
    ws.on('message', function message(data, isbinary) {
        wss.clients.forEach(function each(client) {
            const parsedData = data;
            const messageWithColor = Object.assign(Object.assign({}, parsedData), { color: clientColor });
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(messageWithColor, { binary: isbinary });
            }
        });
    });
});
