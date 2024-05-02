import { log, ReadJSON } from "./toolkit.js";
export default async function sokete({ url="/", name="Juan", room="room1"}) {
    url = String(url);
    name = String(name);
    room = String(room);
    const io = (await import("./socket.io.esm.min.js")).default;
    // const iceServers = await ReadJSON("/cli/iceServers.json");
    const socket = io(url);
    socket.on("connect", () => {
        console.log("ID:", socket.id);
        socket.emit("join", room);
    });
    
    socket.on("join", (client) => {
        let num_random = Math.floor(Math.random() * 1000);
        let valueData = "Hola: " + num_random;
        console.log("join: ", client, " send value :" + valueData);
        // socket.emit("offer", valueData, client);
        socket.send({event:"offer", data:valueData, to:client})
    });

    socket.on("offer", (offer, sender)=>{
        console.log("offer: ", offer);
    })
}
