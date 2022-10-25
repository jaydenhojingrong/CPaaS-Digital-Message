import fetch from 'node-fetch';
import { MessageBirdResponse } from "../interfaces/MessageBirdResponse";
import { messageContent } from "../services/WhatsApp";
import { retrieveContacts } from "../services/retrieveContacts";

async function test(){
    var hello = await messageContent('Spg0nt3GILwAxHbVVKlxoKoMm','6583685216','hi');
    var number = hello["status"]
}
//console.log(test());


async function testcontact(){
    var hi =  await retrieveContacts('Spg0nt3GILwAxHbVVKlxoKoMm');
    var items = hi["items"]
    var loop = ""
    for (let i = 0; i < items.length; i++) {
        loop= items[i]["lastName"]
        console.log(loop)
     }
}
console.log(testcontact());