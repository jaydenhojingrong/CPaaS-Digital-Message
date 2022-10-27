// get type and userid

function extractData(payload) {
    let eventType: string;

    try{

        eventType = payload["events"][0]["type"];

        // only follow, unfollow and message event is tracked

        if (eventType != "follow" && eventType != "unfollow" && eventType != "message"){
            throw "Data not recognized";
        }

        if (eventType == "message"){
            // message? get userid + messages
                return [
                    eventType,
                    payload["events"][0]["message"]["text"],
                    payload["events"][0]["source"]["userId"]
                ];
        }
        return [
            eventType,
            payload["events"][0]["timestamp"],
            payload["events"][0]["source"]["userId"]
        ];
        
    }
    catch(err){
        throw "Data not recognized";
    }
        

}

export { extractData };