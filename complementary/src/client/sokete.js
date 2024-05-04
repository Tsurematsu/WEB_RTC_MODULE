import { log, ReadJSON } from "./toolkit.js";
export default async function sokete({ url="/", name="Juan", room="room1"}) {
    url = String(url);
    name = String(name);
    room = String(room);
    const local_Log = console.log;
    const iceServers = await ReadJSON("/cli/iceServers.json");
    const peerClients = {};
    const eventNames = {
        offer: "offer",
        answer: "answer",
        candidate: "candidate"
    }
    const createPeerClient = (client) => {
        const peerClient = new RTCPeerConnection({iceServers})
        const chat = peerClient.createDataChannel('chat');
        chat.addEventListener('open', () => {
            let randomNumber = Math.floor(Math.random() * 1000);
            local_Log("Send: Hola k tal:" + randomNumber)
            chat.send("Hola k tal:" + randomNumber);
        });
        peerClient.addEventListener('datachannel', (event) => {
            const canal = event.channel;
            canal.addEventListener('message', (input) => {
                local_Log(input.data);
            })
        });
        peerClient.onicecandidate = (event) => {if (event.candidate) {
            socket.send({
                event:eventNames.candidate, 
                data:event.candidate, 
                to:client
            }); 
        }};
        return peerClient;
    };
    const io = (await import("./socket.io.esm.min.js")).default;
    const socket = io(url);
    socket.on("connect", () => {socket.emit("join", room);});
    socket.on("join", (client) => {
        let tempPeerClient = createPeerClient(client);
        tempPeerClient.createOffer().then((offer) => {
            tempPeerClient.setLocalDescription(offer);
            socket.send({
                event:eventNames.offer, 
                data:offer, 
                to:client
            });
        });
        peerClients[client] = tempPeerClient;
    });
    socket.on(eventNames.offer, (offer, sender) => {
        let temPeerClient = createPeerClient(sender);
        temPeerClient.setRemoteDescription(new RTCSessionDescription(offer));
        temPeerClient.createAnswer().then((answer) => {
            temPeerClient.setLocalDescription(answer);
            socket.send({
                event:eventNames.answer, 
                data:answer, 
                to:sender
            });
        });
        peerClients[sender] = temPeerClient;
    });
    socket.on(eventNames.answer, (answer, sender) => {
        peerClients[sender].setRemoteDescription(new RTCSessionDescription(answer));
    });
    
    socket.on(eventNames.candidate, (candidate, sender) => {
        peerClients[sender].addIceCandidate(new RTCIceCandidate(candidate));
    });
    socket.on("leave", (id) => {
        peerClients[id].close();
        delete peerClients[id];
    });
}
