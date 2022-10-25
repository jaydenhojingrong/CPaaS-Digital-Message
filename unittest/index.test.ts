import { add, testLINEFunctionOne, testLINEFunctionThree, testLINEFunctionTwo } from '../src/index';
import { check } from '../src/index';
import { testcontact } from '../src/index';
import { testLinecontact } from '../src/index';
import { testWhatsappFunctionOne } from '../src/index';
import { testWhatsappFunctionTwo } from '../src/index';
import { testWhatsappFunctionThree } from '../src/index';
import { testWhatsappFunctionFour } from '../src/index';
import { makeRequest } from '../src/index';
import { messageContent } from '../digital-message/services/WhatsApp';
import { MessageBirdResponse } from "../digital-message/interfaces/MessageBirdResponse";
import { resourceLimits } from 'worker_threads';

describe('testing mobile number', () => {
  test('Correct mobile number', () => {
    expect(add('83685216')).toBe("83685216");
  });
  test('Wrong mobile number', () => {
    expect(add('836852169')).toBe("83685216");
  });
});

describe('testing channel', () => {
  test('LINE channels', () => {
    expect(check('LINE')).toBe("LINE");
  });
  test('Whatsapp channel', () => {
    expect(check('Whatsapp')).toBe("Whatsapp");
  });
  test('Both channels', () => {
    expect(check('LINE, Whatsapp')).toBe("LINE, Whatsapp");
  });
});

it('health checker', async () => {
  expect.assertions(1);
  const data = await makeRequest();
  expect(data).toEqual(200);
});

it('Retrieve contacts', async () => {
  expect.assertions(1);
  const data = await testcontact();
  const channels = ['WhatsApp', 'LINE']
  expect(data).toEqual(expect.not.arrayContaining(channels))  
  
});

it('Retrieve LINE contacts', async () => {
  expect.assertions(1);
  const data = await testLinecontact();
  expect(data).not.toEqual(expect.arrayContaining(["null"]))  
});

it('works with whatsappFunction1', async () => {
  expect.assertions(1);
  const data = await testWhatsappFunctionOne();
  expect(data).toEqual('accepted');
});

it('works with whatsappFunction2', async () => {
  expect.assertions(1);
  const data = await testWhatsappFunctionTwo();
  expect(data).toEqual('accepted');
});

it('works with whatsappFunction3', async () => {
  expect.assertions(1);
  const data = await testWhatsappFunctionThree();
  expect(data).toEqual('accepted');
});

it('works with whatsappFunction4', async () => {
  expect.assertions(1);
  const data = await testWhatsappFunctionFour();
  expect(data).toEqual('accepted');
});

it('works with LINEFunction1', async () => {
  expect.assertions(1);
  const data = await testLINEFunctionOne();
  expect(data).toEqual('accepted');
});

it('works with LINEFunction2', async () => {
  expect.assertions(1);
  const data = await testLINEFunctionTwo();
  expect(data).toEqual('accepted');
});

it('works with LINEFunction3', async () => {
  expect.assertions(1);
  const data = await testLINEFunctionThree();
  expect(data).toEqual('accepted');
});

