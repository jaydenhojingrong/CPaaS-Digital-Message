import fetch from 'node-fetch';
import { MessageBirdResponse } from "./MessageBirdResponse";

async function postLine(key, channelID, message, contentType): Promise<MessageBirdResponse> {
    try {
      const response = await fetch('https://conversations.messagebird.com/v1/send',
      {
        method: 'POST',
        body: JSON.stringify({
          to: channelID,
          from: "17157f7ddfc242769621eb1bb79e5cbb",
          type: contentType,
          content: {
            text: `Hi there! 
            \n${message}
            \n Thanks!`
     
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


  // `Hi there! Here's the lastest news on ${urlTitle}
  // \n${message}
  // \nFor more information, please click on the link ${urlHref}`