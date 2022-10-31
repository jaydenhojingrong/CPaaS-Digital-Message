import fetch from 'node-fetch';
import { MessageBirdResponse } from "../interfaces/MessageBirdResponse";


async function retrieveContacts(key,audience): Promise<MessageBirdResponse> {
    try {
        // check for spelling when making new group
        const groupHash = {
          "Intermediary": "eef8b666f7d94e22ab2d40616d3c42d5",
          "Insurance": "006207f33d864379bb0a9983ab6a6295",
          "Institutional": "a40a9359637a4fee88816123681735ad",
          "All topics": "110a4f3ac6854659876b794b5393f9e5",
        };
        
        const groupID = groupHash[audience]
        const messagebirdContactURL = ' https://rest.messagebird.com/groups/' + groupID + '/contacts';
        const response = await fetch(messagebirdContactURL,
        {
          method: 'GET',
          headers:{
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `AccessKey ${key}`,
          }
        });

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
    
        const result = await response.json();
        return result as MessageBirdResponse;
  
      } catch (err) {
        console.log(err);
      }
    }

export { retrieveContacts };