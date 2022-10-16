import fetch from 'node-fetch';
import { MessageBirdResponse } from "./MessageBirdResponse";

async function line_message(key, channelID, message): Promise<MessageBirdResponse> {
  try {
    const response = await fetch('https://conversations.messagebird.com/v1/send',
      {
        method: 'POST',
        body: JSON.stringify({
          to: channelID,
          from: "17157f7ddfc242769621eb1bb79e5cbb",
          type: "text",
          content: {
            text: `Hi there! 
            \n${message}
            \nThanks!`

          }
        }),
        headers: {
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

async function line_richMessage(key, channelID, message): Promise<MessageBirdResponse> {
  try {
    const response = await fetch('https://conversations.messagebird.com/v1/send',
      {
        method: 'POST',
        body: JSON.stringify({
          to: channelID,
          from: "17157f7ddfc242769621eb1bb79e5cbb",
          type: "text",
          content: {
            text: `Hi there! 
            \n${message}
            \n*Please reference to the attached media as shown above.*
            \nThanks!`

          }
        }),
        headers: {
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

async function line_image(key, channelID, contentType, mediaURL): Promise<MessageBirdResponse> {
  try {
    const response = await fetch("https://conversations.messagebird.com/v1/send",
      {
        method: 'POST',
        body: JSON.stringify({
          to: channelID,
          from: "17157f7ddfc242769621eb1bb79e5cbb",
          type: "image",
          content: {
            image: {
              url: mediaURL
            }
         }
        }),
        headers: {
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

async function line_video(key, channelID, contentType, mediaURL): Promise<MessageBirdResponse> {
  try {
    const response = await fetch("https://conversations.messagebird.com/v1/send",
      {
        method: 'POST',
        body: JSON.stringify({
          to: channelID,
          from: "17157f7ddfc242769621eb1bb79e5cbb",
          type: "video",
          content: {
            video: {
              url: mediaURL
            }
         }
        }),
        headers: {
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

async function line_file(key, channelID, mediaURL): Promise<MessageBirdResponse> {
  try {
    const response = await fetch('https://conversations.messagebird.com/v1/send',
      {
        method: 'POST',
        body: JSON.stringify({
          to: channelID,
          from: "17157f7ddfc242769621eb1bb79e5cbb",
          type: "text",
          content: {
            text: mediaURL
          }
        }),
        headers: {
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

export { line_message, line_image, line_video, line_file, line_richMessage};


  // `Hi there! Here's the lastest news on ${urlTitle}
  // \n${message}
  // \nFor more information, please click on the link ${urlHref}`