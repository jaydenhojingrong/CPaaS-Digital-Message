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

    // this is a list now
    const channelList = data[1];
    
    let mbResponse: MessageBirdResponse;
    const channelSucceeded = {}
    const channelFailed = {}

    for (const channel of channelList) {
      if (channel == "WhatsApp"){
        // if (req.body.channel == "WhatsApp"){
          mbResponse = await postWhatsApp(message, apiKey);
        }
    
      if (channel == "LINE"){
        mbResponse = await postLine(message, apiKey);
      }

      let tempDict = {}

      if( mbResponse["status"] == "accepted"){
        channelSucceeded[channel] = mbResponse["status"]
      } else {
                                 // insert error handling into this function
        channelFailed[channel] = mbResponse["status"]
      }

      context.res = {
          // status: 200, /* Defaults to 200 */
          body: (JSON.stringify({
            "code": 200,
            "channels_sent":channelList,
            "channel_succeeded":channelSucceeded,
            "channel_failed":channelFailed,
          }))
      };
    }
};


export default httpTrigger;
