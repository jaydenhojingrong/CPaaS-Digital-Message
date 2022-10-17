import { messageContent, imageContent, videoContent, documentContent } from "../services/WhatsApp";
import { line_message, line_image, line_video, line_file, line_richMessage } from "../services/Line";
import { MessageBirdResponse } from "../interfaces/MessageBirdResponse";

// return true if message is sent
// false if contact not sent
async function routeMessage(contact, isLine, isWhatsapp, isRichMedia, getChannel, contentType, apiKey, message, mediaURL): Promise<MessageBirdResponse> {
    let mbResponse: MessageBirdResponse;

    // LINE
    if (isLine && getChannel == "LINE") {
    
        // get the LINEID which is stored in custom1
        var to = contact["customDetails"]["custom1"];
        // route them to the relevant content type template
        if (contentType == "text") {
            mbResponse = await line_message(apiKey, to, message);
        }
        else if (contentType == "image" ) {
            mbResponse = await line_image(apiKey, to, contentType, mediaURL);
        }
        else if (contentType == "video" ) {
            mbResponse = await line_video(apiKey, to, contentType, mediaURL);
        }
        else if (contentType == "document" ) {
            mbResponse = await line_file(apiKey, to, mediaURL);
        }
        else if (mbResponse) {
            mbResponse = await line_richMessage(apiKey, to, message);
        }
        return mbResponse;
    }

    // WHATSAPP
    else if (isWhatsapp && getChannel == "WhatsApp") {
    var to = contact["msisdn"];
    if (isRichMedia) {
        if (contentType == "image") {
            mbResponse = await imageContent(apiKey, to, contentType, message, mediaURL);
            console.log("in image");
        }
        else if (contentType == "video"){
            mbResponse = await videoContent(apiKey, to, contentType, message, mediaURL);
            console.log("in video");
        }
        else {
            mbResponse = await documentContent(apiKey, to, contentType, message, mediaURL);
            console.log("in file");
        }
    }
    else {
        mbResponse = await messageContent(apiKey, to, message);
        console.log("in text");
    }
    return mbResponse;
  }

  mbResponse = {
    "id": "",
    "status": 'skip',
    "fallback": ""
  };

  return mbResponse as MessageBirdResponse;
}

export { routeMessage };