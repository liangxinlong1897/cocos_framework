import { _decorator, Component, Node } from 'cc';
import { WsClient } from 'tsrpc-browser';
import { serviceProto } from './game/net/shared/protocols/serviceProto';
const { ccclass, property } = _decorator;

@ccclass('App')
export class App extends Component {

    client = new WsClient(serviceProto, {
            server: 'ws:127.0.0.1:3000',
            logger: console
        });

    start() {
        this.connect()
        this.client.logger.log("连接中")
        
    }

    async connect(): Promise<void> {
        let res = await this.client.connect()
        if (!res.isSucc) {
            // Retry connect after 2 seconds
            await new Promise(rs => { setTimeout(rs, 2000)});
            await this.connect();
        } else {
            this.client.logger.log("连接成功")
            this.client.callApi('Send', {
                content: "dididi"
            });
        }
    }

    update(deltaTime: number) {
        
    }
}


