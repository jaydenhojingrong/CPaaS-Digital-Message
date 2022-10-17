import fetch from 'node-fetch';
import { MessageBirdResponse } from "../interfaces/MessageBirdResponse";

async function postMessage(key, from, to, message, urlTitle, urlHref): Promise<MessageBirdResponse> {
    try {
      const response = await fetch('https://conversations.messagebird.com/v1/send',
      {
        method: 'POST',
        body: JSON.stringify({
          to: to,
          from: from,
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

  export { postMessage };