import fetch from 'node-fetch';
import { MessageBirdResponse } from "./MessageBirdResponse";

async function postLine(message, key, file, urlLink): Promise<MessageBirdResponse> {
    try {
      const response = await fetch('https://conversations.messagebird.com/v1/send',
      {
        method: 'POST',
        body: JSON.stringify({
          to: 'U19f76a7c17d4d1ee01927bf6669a1039',
          type: 'text',
          from: '17157f7ddfc242769621eb1bb79e5cbb',
          content:{
            text: message
          }
        }),
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

  export { postLine };