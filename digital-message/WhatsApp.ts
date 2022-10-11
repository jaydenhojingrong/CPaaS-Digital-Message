import fetch from 'node-fetch';
import { MessageBirdResponse } from "./MessageBirdResponse";

async function postWhatsApp(message, key, contactID, urlTitle, urlLink, image): Promise<MessageBirdResponse> {
    try {
      const response = await fetch('https://conversations.messagebird.com/v1/send',
      {
        method: 'POST',
        body: JSON.stringify({
          to: '+65' + contactID,
          type: 'hsm',
          from: '0d80abd0-6ab4-4b51-b91c-a034d7c62669',
          content: {
            hsm: {
              namespace: "320b2259_c43d_4d2b_966e_628d091cd90b",
              templateName: "thanking",
              language: {
                policy: "deterministic",
                code: "en"
              },
              components: [
                {
                  type: "body",
                  parameters: [
                    {
                      type: "text",
                      text: urlTitle
                    },
                    {
                      type: "text",
                      text: message
                    },
                    {
                      type: "text",
                      text: urlLink
                    }
                  ],
                },
                {
                  type: "header",
                  parameters: [
                    {
                      type: "image",
                      image: {
                        url: `${image}`
                      }
                    }
                  ]
                }
              ]
            }
          }
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `AccessKey ${key}`,
        }
      });

    if (!response.ok) {
      throw new Error(`Error!!!!!`);
    }

    const result = await response.json();
    return result as MessageBirdResponse;

  } catch (err) {
    const result = {
      "id": "",
      "status": "Invalid Recipient ID",
      "fallback": ""
    };
    return result as MessageBirdResponse;
  }
}

export { postWhatsApp };