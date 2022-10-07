import fetch from 'node-fetch';
import { MessageBirdResponse } from "./MessageBirdResponse";

async function postLine(message, key, images_videos): Promise<MessageBirdResponse> {
    try {
      const response = await fetch('https://conversations.messagebird.com/v1/send',
      {
        method: 'POST',
        body: JSON.stringify({
          to: 'Cc62c40d5f7d6075ef86bafde67f79331',
          type: 'text',
          from: '80f0206cddb44023a58f1eb7886cf7e0',
          content:{
            text: message, images_videos
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