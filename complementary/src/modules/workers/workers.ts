import externalServers from "./externalServers";
import stunServer from "./stunServer";
import path from 'path';
export interface IWorkers {
    port_stunServer?: number;
    port_reactServer?: number;
    port_astroServer?: number;
}
export default async function workers(){
    const port_stunServer = await stunServer({});
    const URL_reactServer = path.join(__dirname, '../../../../reactserver/start.bat');
    const port_reactServer = await externalServers(URL_reactServer, 'reactServer');
    const URL_astroServer = path.join(__dirname, '../../../../astroServer/start.bat');
    const port_astroServer = await externalServers(URL_astroServer, 'astroServer');
    return {
        port_stunServer, 
        port_reactServer,
        port_astroServer
    } as IWorkers;
}
