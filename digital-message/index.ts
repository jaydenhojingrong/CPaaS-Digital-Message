import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { retrieveContacts } from "./services/RetrieveContacts";
import { MessageBirdResponse } from "./interfaces/MessageBirdResponse";
import { extractData } from "./services/DataExtractor";
import { CpaasResponse } from "./interfaces/CpaasResponse";
import { routeMessage } from "./services/RouteMessage";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

  const { apiKey } = process.env;

  const channelSucceeded = {}
  const channelFailed = {}
  let mbResponse: MessageBirdResponse;
  let cpaasResponse: CpaasResponse;
  let code: number;
  var isLine:boolean = false;
  var isWhatsapp:boolean = false;
  var isRichMedia:boolean = false;

  /// calls extractData function from DataExtractor

  const data = extractData(req.body);
  const message = data[0];
  const channelList = data[1];
  const contentType = data[2].toString().toLowerCase();
  const audienceGroup = data[4]
  
  // if content type is not text.. collect URL 
  if (contentType != "text") {
    isRichMedia = true;
    var file = data[3];
    var mediaURL = file.url;
  }

  // check which channels are selected
  if (channelList.includes("LINE")){
    isLine = true;
  }
  if (channelList.includes("WhatsApp")){
    isWhatsapp = true;
  } 

  // if the data (from payload) is not empty collect contacts from msgbird and send to contacts
  if (data) {
    // use hashmap to remove duplicates
    const contactMap = {};
    // going through the list of audienceGroup 
    for (const audience of audienceGroup){

      mbResponse = await retrieveContacts(apiKey, audience);
      const getContacts = mbResponse['items'];
      // going through list of contacts in audienceGroups
      for (const contact of getContacts) {
        // append to hashmap using unique msisdn as key
        // const msisdn = contact["msisdn"]
        contactMap[contact["msisdn"]] = contact
        // Object.assign(contactMap, {msisdn: contact});       
      }
    }

    for (var contactMsisdn in contactMap){
      var contact = contactMap[contactMsisdn]
      // for each contact.. get the channel from the last name
      var getChannel = contact['lastName'];
      mbResponse = await routeMessage(contact, isLine, isWhatsapp, isRichMedia, getChannel, contentType, apiKey, message, mediaURL);

      if (mbResponse["status"] == "accepted") {
        channelSucceeded[getChannel] = mbResponse["status"];
      }
      else if (mbResponse["status"] != "skip") {
        // insert error handling into this function
        channelFailed[getChannel] = mbResponse["status"];
      }
    }


    if (Object.keys(channelFailed).length === 0) {
      code = 200;
    }
    else {
      code = 500;
    }
  }

  // context.log(JSON.stringify({
  //   "code": code,
  //   "channels_sent": channelList,
  //   "channel_succeeded": channelSucceeded,
  //   "channel_failed": channelFailed,
  // }));

  cpaasResponse = {
    "code": code,
    "channels_sent": channelList,
    "channel_succeeded": channelSucceeded,
    "channel_failed": channelFailed,
  }

  context.res = {
    status: code,
    body: (JSON.stringify(cpaasResponse))
  };
};


export default httpTrigger;
