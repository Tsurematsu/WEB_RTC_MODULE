import {console as toolkitConsole} from './libs/toolkit';
import dotenv from 'dotenv';
import workers from './modules/workers/workers';
import express from './modules/express/express'
import proxies from './modules/proxies/proxies';
import http from 'http';
dotenv.config();
async function main(){
    toolkitConsole.clearConsole();
    const PORT = process.env.PORT || 3000;
    const ports = await workers();
    const app = express();
    const server = http.createServer(app);
    proxies(app, ports);
    server.listen(PORT);
    console.log(`[Main_Server]> Server is running on port http://localhost:${PORT}`);
}
main();