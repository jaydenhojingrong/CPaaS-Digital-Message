import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { postWhatsApp } from "./WhatsApp";
import { postLine } from "./Line";
import { MessageBirdResponse } from "./MessageBirdResponse";
import { extractData } from "./DataExtractor";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const { apiKey } = process.env;
    
    context.log('HTTP trigger function processing a request.');
    // context.log(req.body);

    const data = extractData(req.body);

    const message = data[0];
    const channelList = data[1];
    const contactID = data[2];
    
    let mbResponse: MessageBirdResponse;
    const channelSucceeded = {}
    const channelFailed = {}
    let code = 0;

    for (const channel of channelList) {

      if (channel == "WhatsApp"){
          mbResponse = await postWhatsApp(message, apiKey, contactID);
          context.log(mbResponse);
        }
    
      else if (channel == "LINE"){
        mbResponse = await postLine(message, apiKey);
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

    }
};


export default httpTrigger;
