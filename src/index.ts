import { messageContent } from '../digital-message/services/WhatsApp';
import { imageContent } from '../digital-message/services/WhatsApp';
import { videoContent } from '../digital-message/services/WhatsApp';
import { documentContent } from '../digital-message/services/WhatsApp';
import { line_message } from '../digital-message/services/Line';
import { line_image } from '../digital-message/services/Line';
import { line_video } from '../digital-message/services/Line';
import { retrieveContacts } from "../digital-message/services/retrieveContacts";
import fetch from 'node-fetch';

export async function makeRequest() {
    try {
      const response = await fetch('http://localhost:7071/api/health');
      return response.status // 👉️ 200
  
    } catch (err) {
      console.log(err);
    }
  }
  

export function add(numbers: string){
    let mobile = numbers;
    let count = numbers.length;
 
    if (count < 8)
        throw new RangeError('number is less than 8 digits: ' + count);
    if (count > 8)
        throw new RangeError('number is more than 8 digits: ' + count);

    return mobile;

}
export function check(channels: string){
 
    if (channels != 'LINE' && channels != 'Whatsapp' && channels != 'LINE, Whatsapp')
        throw new RangeError('channel not found');

    return channels;

}

export async function testWhatsappFunctionOne(){
    var content = await messageContent('Spg0nt3GILwAxHbVVKlxoKoMm/123','6583685216','hi');
    var value = content["status"]
    return value
}

export async function testWhatsappFunctionTwo(){
    var content = await imageContent('Spg0nt3GILwAxHbVVKlxoKoMm123','6583685216','image/png','hi','https://eu-images.contentstack.com/v3/assets/blt2233c63cb81d9b74/blt5dc0dc4e42905d70/634c03d196c0500f0511b5f6/cat.png');
    var value = content["status"]
    return value
}

export async function testWhatsappFunctionThree(){
    var content = await videoContent('Spg0nt3GILwAxHbVVKlxoKoMm123','6583685216','Video','hi','https://eu-assets.contentstack.com/v3/assets/blt2233c63cb81d9b74/blt2bfc06495cdfb725/634a28328f37810f03d5b749/catVideo.mp4');
    var value = content["status"]
    return value
}

export async function testWhatsappFunctionFour(){
    var content = await documentContent('Spg0nt3GILwAxHbVVKlxoKoMm123','6583685216','Document','hi','https://eu-assets.contentstack.com/v3/assets/blt2233c63cb81d9b74/bltab4224846f2fae19/634a2e67c473a75d5c5e76ea/Schroders_transcript.pdf');
    var value = content["status"]
    return value
}

export async function testLINEFunctionOne(){
    var content = await line_message('Spg0nt3GILwAxHbVVKlxoKoMm123','cfe72aa08a9c42659bc7851e6a82a79b','hi');
    var value = content["status"]
    return value
}

export async function testLINEFunctionTwo(){
    var content = await line_image('Spg0nt3GILwAxHbVVKlxoKoMm123','cfe72aa08a9c42659bc7851e6a82a79b','image','https://eu-images.contentstack.com/v3/assets/blt2233c63cb81d9b74/bltd201a6de6c6cb58c/631f5165ad808074367e0a6f/olivia.png');
    var value = content["status"]
    return value
}

export async function testLINEFunctionThree(){
    var content = await line_video('Spg0nt3GILwAxHbVVKlxoKoMm123','cfe72aa08a9c42659bc7851e6a82a79b','Video','https://eu-assets.contentstack.com/v3/assets/blt2233c63cb81d9b74/blt2bfc06495cdfb725/634a28328f37810f03d5b749/catVideo.mp4');
    var value = content["status"]
    return value
}



export async function testcontact(){
    var hi =  await retrieveContacts('Spg0nt3GILwAxHbVVKlxoKoMm');
    var items = hi["items"]
    var loop = ""
    var dict = []
    for (let i = 0; i < items.length; i++) {
        loop= items[i]["lastName"]
        dict.push(loop)
     }

    return dict
}

export async function testLinecontact(){
    var hi =  await retrieveContacts('Spg0nt3GILwAxHbVVKlxoKoMm');
    var items = hi["items"]
    var loop = ""
    var dictCustom = []
    for (let i = 0; i < items.length; i++) {
        loop= items[i]["customDetails"]
        if (items[i]["lastName"] == 'LINE'){
        dictCustom.push(loop["custom1"])
        }
     }
    return dictCustom
    }




 