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
    const channel = data[1];

    let mbResponse: MessageBirdResponse;
    if (channel == "WhatsApp"){
    // if (req.body.channel == "WhatsApp"){
      mbResponse = await postWhatsApp(message, apiKey);
    }
    else if (channel == "LINE"){
      mbResponse = await postLine(message, apiKey);
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: (JSON.stringify({
          "code": 200,
          "system_message": mbResponse["status"]
        }))
    };
};


export default httpTrigger;
