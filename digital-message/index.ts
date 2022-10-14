import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { whatsappImageText } from "./WhatsApp";
import { postLine } from "./Line";
import { retrieveConatcts } from "./retrieveContacts";
import { MessageBirdResponse } from "./MessageBirdResponse";
import { extractData } from "./DataExtractor";
import { postMessage } from "./messageTemplate";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

  // const { apiKey } = process.env;
  const apiKey = "Spg0nt3GILwAxHbVVKlxoKoMm";

  const data = extractData(req.body);
  var message = data[0];
  const channelList = data[1];
  const contentType = data[2];
  var file = data[3];
  var urlLink = data[4];
  var image = file.url;
  var urlTitle = urlLink.title;
  var urlHref = urlLink.href;
  const channelSucceeded = {}
  const channelFailed = {}
  let mbResponse: MessageBirdResponse;
  let code = 0;
  var line = false;
  var whatsapp = false;

  // if (contentType.toLowerCase() == "text") {
  //   var message = data[0];
  // } else{
  //   var file = data[3];
  //   var urlLink = data[4];
  //   var image = file.url;
  //   var urlTitle = urlLink.title;
  //   var urlHref = urlLink.href;
  // }

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
      if (line && getChannel == "LINE") {
        var to = contact["customDetails"]["custom1"];
        var response = await postLine(apiKey, to, message, contentType.toLowerCase(), urlTitle, urlHref,);
        console.log("LINE" , response);
      }
      if (whatsapp && getChannel == "WhatsApp") {
        var to = contact["msisdn"];
        var response = await whatsappImageText(apiKey, to, message, urlTitle, urlHref, image);
        console.log("WHATSAPP" , response);
      }

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
