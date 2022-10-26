import fetch from 'node-fetch';
import { MessageBirdResponse } from "../interfaces/MessageBirdResponse";

async function retrieveContacts(key): Promise<MessageBirdResponse> {
    try {
      // https://rest.messagebird.com/groups/{groupID}/contacts
        const response = await fetch('https://rest.messagebird.com/contacts',
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