import { add } from '../src/index';
import { check } from '../src/index';
import { testcontact } from '../src/index';
import { testWhatsappFunctionOne } from '../src/index';
import { testWhatsappFunctionTwo } from '../src/index';
import { testWhatsappFunctionThree } from '../src/index';
import { testWhatsappFunctionFour } from '../src/index';
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

it('Retrieve contacts', async () => {
  expect.assertions(2);
  const data = await testcontact();
  expect(data).toEqual(expect.arrayContaining(["LINE"]))  
  expect(data).toEqual(expect.arrayContaining(["WhatsApp"]))  
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

