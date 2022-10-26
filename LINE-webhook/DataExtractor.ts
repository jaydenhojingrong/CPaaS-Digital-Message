// get type and userid

function extractData(payload) {
    let eventType: string;

    try{

        eventType = payload["events"][0]["type"];

        if (eventType != "follow" && eventType != "unfollow"){
            throw "Data not recognized";
        }
        return [
            eventType,
            payload["events"][0]["timestamp"],
            payload["events"][0]["source"]["userId"]
        ];
        
    }
    catch(err){
        console.log("ooooooo");
        throw "Data not recognized";

    }
        

}

export { extractData };