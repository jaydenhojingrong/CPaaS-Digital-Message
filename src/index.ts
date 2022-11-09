import { messageContent, imageContent, videoContent, documentContent } from '../digital-message/services/WhatsApp';
import { line_message, line_image, line_video } from '../digital-message/services/Line';
import { retrieveContacts } from "../digital-message/services/retrieveContacts";
import fetch from 'node-fetch';

export async function makeRequest() {
    try {
      const response = await fetch('http://localhost:7071/api/health');
      return response.status // 👉️ 200
  
    } catch (err) {
    }
  }

  type CreateUserResponse = {
    data: string;
    entry: string;
    channels_to_publish: string;
    audience_group: string;
    content_type: string;
    created_at: string;
    link_file: string;
    title: string;
    href: string;
    messages: string;
    rich_media: string;

  };
  
  async function createUser() {
    try {
      // 👇️ const response: Response
      const response = await fetch('https://cpaas-digital-message.azurewebsites.net/api/digital-message', {
        method: 'POST',
        body: JSON.stringify({
            data: {
                entry: {
                    channels_to_publish: [
                        "LINE"
                    ],
                    audience_group:[
                        "Institutional"
                    ],
                    content_type: "Text",
                    created_at: "2022-10-12T06:10:16.157Z",
                    created_by: "blt437013b967bb61fc",
                    link_file: {
                        title: "",
                        href: ""
                    },
                    messages: "This is a testing message",
                    rich_media: null
                }
            }
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
  
      // 👇️ const result: CreateUserResponse
      const result = (await response.json()) as CreateUserResponse;

  
      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
   
  }

export async function overall(){
    var funcValue = await createUser()
    var overallValue = funcValue["code"]
    return overallValue
}
  
  
export async function testWhatsappFunctionOne(){
    var content = await messageContent('OD9JjrVluF4ON00310kMWXJLa','6583685216','hi');
    var value = content["status"]
    return value
}

export async function testWhatsappFunctionTwo(){
    var content = await imageContent('OD9JjrVluF4ON00310kMWXJLa','6583685216','image/png','hi','https://eu-images.contentstack.com/v3/assets/blt2233c63cb81d9b74/blt5dc0dc4e42905d70/634c03d196c0500f0511b5f6/cat.png');
    var value = content["status"]
    return value
}

export async function testWhatsappFunctionThree(){
    var content = await videoContent('OD9JjrVluF4ON00310kMWXJLa','6583685216','Video','hi','https://eu-assets.contentstack.com/v3/assets/blt2233c63cb81d9b74/blt2bfc06495cdfb725/634a28328f37810f03d5b749/catVideo.mp4');
    var value = content["status"]
    return value
}

export async function testWhatsappFunctionFour(){
    var content = await documentContent('OD9JjrVluF4ON00310kMWXJLa','6583685216','Document','hi','https://eu-assets.contentstack.com/v3/assets/blt2233c63cb81d9b74/bltab4224846f2fae19/634a2e67c473a75d5c5e76ea/Schroders_transcript.pdf');
    var value = content["status"]
    return value
}

export async function testLINEFunctionOne(){
    var content = await line_message('OD9JjrVluF4ON00310kMWXJLa','Uba3d02f75bbe48738a9c47926a2f173d/','hi');
    var value = content["status"]
    return value
}

export async function testLINEFunctionTwo(){
    var content = await line_image('OD9JjrVluF4ON00310kMWXJLa','Uba3d02f75bbe48738a9c47926a2f173d/','image','https://eu-images.contentstack.com/v3/assets/blt2233c63cb81d9b74/bltd201a6de6c6cb58c/631f5165ad808074367e0a6f/olivia.png');
    var value = content["status"]
    return value
}

export async function testLINEFunctionThree(){
    var content = await line_video('OD9JjrVluF4ON00310kMWXJLa','Uba3d02f75bbe48738a9c47926a2f173d/','Video','https://eu-assets.contentstack.com/v3/assets/blt2233c63cb81d9b74/blt2bfc06495cdfb725/634a28328f37810f03d5b749/catVideo.mp4');
    var value = content["status"]
    return value
}

export async function testcontact(){
    var hi =  await retrieveContacts('OD9JjrVluF4ON00310kMWXJLa',"Insurance");
    var items = hi["items"]
    var loop = ""
    var dict = []
    var returnNum = "True"
    var dicTrue= []
    var final = "True"
    for (let i = 0; i < items.length; i++) {
        loop= items[i]["lastName"]
        dict.push(loop)
     }
    for (let z = 0; z < dict.length; z++){
        if (dict[z] != 'WhatsApp' && dict[z] != 'LINE'){
            returnNum = "False"
        }
        else {
            returnNum = "True"
        }
        dicTrue.push (returnNum)
    }
    if (dicTrue.includes('False')) {
        final = "False"
    }
    return final
    }



export async function testLinecontact(){
    var hi =  await retrieveContacts('OD9JjrVluF4ON00310kMWXJLa',"Insurance");
    var items = hi["items"]
    var loop = ""
    var dictCustom = []
    var dictvalue = ""
    var dictLength = []
    var returnValue = "True"
    for (let i = 0; i < items.length; i++) {
        loop= items[i]["customDetails"]
        if (items[i]["lastName"] == 'LINE'){
        dictCustom.push(loop["custom1"])
        }
     }
    for (let k = 0; k < dictCustom.length; k++) {
        dictvalue = dictCustom[k]
        dictLength.push(dictvalue.length)
    }
    for (let a = 0; a < dictLength.length; a++){
        if (dictLength[a] == '0'){
          returnValue = "False"
        }
        else {
            returnValue = "True"
        }
    return returnValue
      }
}




 