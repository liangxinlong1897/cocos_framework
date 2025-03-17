import { ApiCall } from "tsrpc";
import { ReqSend, ResSend } from "../shared/protocols/PtlSend";
import { server } from "..";

export default async function (call: ApiCall<ReqSend, ResSend>) {
    // Error
    if (call.req.content.length === 0) {
        call.error('Content is empty')
    } else {
        let time = new Date();
        let connect = call.req.content;
        call.succ({
            time: time
        });
        server.broadcastMsg('Chat', {
            content: connect,
            time: time
        })
    }

    // Success
}