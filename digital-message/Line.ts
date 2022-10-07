import fetch from 'node-fetch';
import { MessageBirdResponse } from "./MessageBirdResponse";

async function postLine(message, key, urlTitle, urlHref): Promise<MessageBirdResponse> {
    try {
      const response = await fetch('https://conversations.messagebird.com/v1/send',
      {
        method: 'POST',
        body: JSON.stringify({
          to: "C850665bea640b5a49c5c3675e7c0ec6f",
          from: "17157f7ddfc242769621eb1bb79e5cbb",
          type: "text",
          content: {
              text: `Hi there! Here's the lastest news on ${urlTitle}
              \n${message}
              \nFor more information, please click on the link ${urlHref}`
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