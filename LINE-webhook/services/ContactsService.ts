// add contact api
import fetch from 'node-fetch';
import { MessageBirdResponse } from '../interfaces/MessageBirdResponse';

async function addContact(key, timestamp, userID): Promise<String> {
  try {
      const response = await fetch('https://rest.messagebird.com/contacts',
      {
        method: 'POST',
        headers:{
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `AccessKey ${key}`,
        },
        body: JSON.stringify({
          msisdn: timestamp,
          firstName: userID,
          lastName: "LINE",
          custom1: userID,
        })
      });
  
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      
      const result = await response.status;
      
      return result;

    } catch (err) {
      console.log(err);
    }
}

// retrieve contact
async function retrieveContacts(key): Promise<MessageBirdResponse> {
  try {
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

// delete contact
async function deleteContact(key, contactId): Promise<String> {
  try {
      const response = await fetch('https://rest.messagebird.com/contacts/'+contactId,
      {
        method: 'DELETE',
        headers:{
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `AccessKey ${key}`,
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
  
      const result = await response.status;
      return result;

    } catch (err) {
      console.log(err);
    }
  }

  // add contact to group
async function addContactToGroup(key, contactId, group, groupDict): Promise<String> {

try {
      const response = await fetch('https://rest.messagebird.com/groups/'+ groupDict[group] +'/contacts',
      {
        method: 'PUT',
        headers:{
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `AccessKey ${key}`,
        },
        body: JSON.stringify({
          ids: [contactId]
        })
      });
  
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
  
      const result = await response.status;
      return result;

    } catch (err) {
      console.log(err);
    }
  }

  //remove contact from group
  async function removeContactFromGroup(key, contactId, group, groupDict): Promise<String> {

    try {
        const response = await fetch('https://rest.messagebird.com/groups/' + groupDict[group] +'/contacts/' + contactId,
        {
          method: 'DELETE',
          headers:{
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `AccessKey ${key}`,
          }
        });
    
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
    
        const result = await response.status;
        return result;
  
      } catch (err) {
        console.log(err);
      }
    }

export { addContact, retrieveContacts, deleteContact, addContactToGroup, removeContactFromGroup };