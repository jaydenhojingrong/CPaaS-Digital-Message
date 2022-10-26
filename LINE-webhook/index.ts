import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { extractData } from "./DataExtractor";
import { MessageBirdResponse } from "./interfaces/MessageBirdResponse";
import { addContact, deleteContact, retrieveContacts } from "./services/ContactsService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { apiKey } = process.env;

    let mbResponse: MessageBirdResponse;
    let contactsDetails: [];
    let mbResponseStatus: String;
    let code = 201;
    let data = [];
    let eventType: String;
    let timestamp: String;
    let userID: String;
    let responseMessage: String;
    
    context.log('HTTP trigger function processed a request.');
    // context.log(req.body);

    /// calls extractData function from DataExtractor
    try{
        data = extractData(req.body);
        eventType = data[0];
        timestamp = data[1];
        userID = data[2];
    }
    catch (err){
        code = 500
        responseMessage = err;
    }

    if (eventType == "follow"){
        // add contact
        mbResponseStatus = await addContact(apiKey, timestamp, userID);
    }
    else if (eventType == "unfollow"){
        // retrieve contacts
        // loop contact to find custom value1 of this ID
        // delete
        mbResponse = await retrieveContacts(apiKey);
        contactsDetails = mbResponse['items'];

        for (const contact of contactsDetails) {
            if (userID == contact['customDetails']['custom1']){
                mbResponseStatus = await deleteContact(apiKey, contact['id']);
                break;
            }
        }
    }
    
    if (mbResponseStatus == "204"){
        code = 204
    }
    else if (mbResponseStatus == "201"){
        responseMessage = "LINE Contact succesfully added to MessageBird"
    }
    else {
        code = 500
        responseMessage = "LINE Contact not added to MessageBird";
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        status: code,
        body: responseMessage
    };

};

export default httpTrigger;