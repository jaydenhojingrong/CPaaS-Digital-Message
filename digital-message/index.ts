import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { messageContent, imageContent, videoContent, documentContent } from "./WhatsApp";
import { line_message, line_image, line_video, line_file, line_richMessage } from "./Line";
import { retrieveConatcts } from "./retrieveContacts";
import { MessageBirdResponse } from "./MessageBirdResponse";
import { extractData } from "./DataExtractor";
import { postMessage } from "./messageTemplate";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

  const { apiKey } = process.env;

  const data = extractData(req.body);
  var message = data[0];
  const channelList = data[1];
  var contentType = data[2];
  contentType = contentType.toString().toLowerCase();
  const channelSucceeded = {}
  const channelFailed = {}
  let mbResponse: MessageBirdResponse;
  let code = 0;
  var line = false;
  var whatsapp = false;
  var richMedia = false;

  if (contentType != "text") {
    richMedia = true;
    var file = data[3];
    var mediaURL = file.url;
    // var urlLink = data[4];
    // var urlTitle = urlLink.title;
    // var urlHref = urlLink.href;
  }
  for (const channel of channelList) {
    if (channel == "LINE") {
      line = true;
    } 
    if (channel == "WhatsApp") {
      whatsapp = true;
    }
  }

  if (data) {
    mbResponse = await retrieveConatcts(apiKey);
    const getContacts = mbResponse['items'];
    for (const contact of getContacts) {
      var getChannel = contact['lastName'];

      //LINE
      if (line && getChannel == "LINE") {
        var to = contact["customDetails"]["custom1"];
        if (contentType == "text") {
          var response = await line_message(apiKey, to, message);
        }
        else { 
          if (contentType == "image" ) {
            var response = await line_image(apiKey, to, contentType, mediaURL);
          }
          if (contentType == "video" ) {
            var response = await line_video(apiKey, to, contentType, mediaURL);
          }
          if (contentType == "document" ) {
            var response = await line_file(apiKey, to, mediaURL);
          }
          if (response) {
            var response = await line_richMessage(apiKey, to, message);
          }
        }
      }

      //WHATSAPP
      if (whatsapp && getChannel == "WhatsApp") {
        var to = contact["msisdn"];
        if (richMedia) {
          if (contentType == "image") {
            var response = await imageContent(apiKey, to, contentType, message, mediaURL);
            console.log("in image");
          }
          else if (contentType == "video"){
            var response = await videoContent(apiKey, to, contentType, message, mediaURL);
            console.log("in video");
          }
          else {
            var response = await documentContent(apiKey, to, contentType, message, mediaURL);
            console.log("in file");
          }
        }
        else {
          var response = await messageContent(apiKey, to, message);
          console.log("in text");
        }
        // console.log("WHATSAPP" , response);
      }

      if(response){
        if (response["status"] == "accepted") {
          channelSucceeded[getChannel] = response["status"];
        }
        else {
          // insert error handling into this function
          channelFailed[getChannel] = response["status"];
        }
  
        if (Object.keys(channelFailed).length === 0) {
          code = 200;
        }
        else {
          code = 500;
        }
      }
    }
  }

  // context.log(JSON.stringify({
  //   "code": code,
  //   "channels_sent": channelList,
  //   "channel_succeeded": channelSucceeded,
  //   "channel_failed": channelFailed,
  // }));

  context.res = {
    body: (JSON.stringify({
      "code": code,
      "channels_sent": channelList,
      "channel_succeeded": channelSucceeded,
      "channel_failed": channelFailed,
    }))
  };

  // context.log(
  //   {
  //     "message": message,
  //     "file": image,
  //     "urlTitle": urlTitle,
  //     "urlHref": urlHref,
  //     "contact": contactID,
  //     "api": apiKey
  //   });

};


export default httpTrigger;
