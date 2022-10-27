import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { extractData } from "./services/DataExtractor";
import { MessageBirdResponse } from "./interfaces/MessageBirdResponse";
import { addContact, deleteContact, retrieveContacts, addContactToGroup, removeContactFromGroup } from "./services/ContactsService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { apiKey } = process.env;
    const groupDict = {1: "eef8b666f7d94e22ab2d40616d3c42d5", 2: "006207f33d864379bb0a9983ab6a6295", 3: "a40a9359637a4fee88816123681735ad"};

    let mbResponse: MessageBirdResponse;
    let contactsDetails: [];
    let data = [];
    let userInputArr: string[];
    let mbResponseStatus: String;
    let eventType: string;
    let timestamp: string;
    let userID: string;
    let responseMessage: string;
    let userInput: string;
    
    context.log('HTTP trigger function processed a request.');
    // context.log(req.body);

    /// extract data from payload from CS
    try { 
        data = extractData(req.body);
        eventType = data[0];

        if (eventType == "message"){
            userInput = data[1];
        }
        else{
            timestamp = data[1];
        }
        userID = data[2];
    }

    catch (err){
        mbResponseStatus = "500"
        responseMessage = err;
    }

    if (eventType == "follow"){
        // add contact
        mbResponseStatus = await addContact(apiKey, timestamp, userID);
        responseMessage = "LINE Contact succesfully added to MessageBird"
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
                responseMessage = "LINE Contact removed from MessageBird";
                break;
            }
        }
    }

    else if (eventType == "message"){
    // message? is message 1234? UNSUB 1234?
    // loop through contacts, find userid.. PUT contact in contact group
        if (groupDict[userInput] !== undefined ){
            mbResponse = await retrieveContacts(apiKey);
            contactsDetails = mbResponse['items'];

            for (const contact of contactsDetails) {
                // found the right userid! put it into the group
                if (userID == contact['customDetails']['custom1']){
                    mbResponseStatus = await addContactToGroup(apiKey, contact['id'], userInput, groupDict);
                    mbResponseStatus = '200';
                    responseMessage = "LINE Contact added to MessageBird Group (ID: " + userInput + ")"; 
                    break;
                }
            }
        }

        else {
            // split the user input
            // is length 2? is first unsub, is second within the group ids?
            // unsub
            userInputArr = userInput.split(" ");
            if (userInputArr.length == 2 && userInputArr[0].toUpperCase() == "UNSUB" && groupDict[userInputArr[1]] !== undefined){
                mbResponse = await retrieveContacts(apiKey);
                contactsDetails = mbResponse['items'];

                for (const contact of contactsDetails) {
                    // found the right userid! put it into the group
                    if (userID == contact['customDetails']['custom1']){
                        mbResponseStatus = await removeContactFromGroup(apiKey, contact['id'], userInputArr[1], groupDict);
                        mbResponseStatus = '200';
                        responseMessage = "LINE Contact removed from MessageBird Group (ID: " + userInput + ")"; 
                        break;
                    }
                }
            }
            else{
                mbResponseStatus = '100'
                responseMessage = "Message received but no action required."
            }
        }
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        status: mbResponseStatus,
        body: responseMessage
    };

};

export default httpTrigger;