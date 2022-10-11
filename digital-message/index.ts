import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { postWhatsApp } from "./WhatsApp";
import { postLine } from "./Line";
import { MessageBirdResponse } from "./MessageBirdResponse";
import { extractData } from "./DataExtractor";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const { apiKey } = process.env;
    
    context.log('HTTP trigger function processing a request.');

    const data = extractData(req.body);

    const message = data[0];
    const channelList = data[1];
    const contactID = data[2];
    const file = data[3];
    const urlLink = data[4];
    const image = file.url;
    const urlTitle = urlLink.title;
    const urlHref = urlLink.href;
    const channelSucceeded = {}
    const channelFailed = {}
    
    let mbResponse: MessageBirdResponse;
    let code = 0;

    for (const channel of channelList) {

      if (channel == "WhatsApp"){
        mbResponse = await postWhatsApp(message, apiKey, contactID, urlTitle, urlHref, image);
        // context.log(mbResponse);
      }
      else if (channel == "LINE"){
        mbResponse = await postLine(message, apiKey, urlTitle, urlHref);
      }

      if( mbResponse["status"] == "accepted"){
        channelSucceeded[channel] = mbResponse["status"]
      } 
      else {
        // insert error handling into this function
        channelFailed[channel] = mbResponse["status"]
      }

      if (Object.keys(channelFailed).length === 0){
        code = 200;
      }
      else{
        code = 500;
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

      context.log(
        {
        "message": message,
        "file": image,
        "urlTitle": urlTitle,
        "urlHref": urlHref,
        "contact": contactID,
        "api": apiKey
        });

    }
};


export default httpTrigger;
