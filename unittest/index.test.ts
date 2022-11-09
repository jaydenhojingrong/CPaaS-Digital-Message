import { testLINEFunctionOne, testLINEFunctionThree, testLINEFunctionTwo } from '../src/index';
import { testcontact, makeRequest, overall } from '../src/index';
import { testWhatsappFunctionOne, testWhatsappFunctionTwo, testWhatsappFunctionThree, testWhatsappFunctionFour } from '../src/index';
import { testLinecontact } from '../src/index';

it('Health Status -> Check if it is 200', async () => {
  expect.assertions(1);
  const data = await makeRequest();
  expect(data).toEqual(200);
});

it('Retrieve channel value -> Check if it is WhatsApp or LINE', async () => {
  expect.assertions(1);
  const data = await testcontact();
  expect(data).toEqual('True')
});

it('Retrieve LINE custom value -> Check if custom value is not null', async () => {
  expect.assertions(1);
  const customdata = await testLinecontact();
  expect(customdata).toEqual('True')

});

it('Overall function', async () => {
  expect.assertions(1);
  const data = await overall();
  expect(data).toEqual(200);
});

it('Whatsapp -> Check if status is accpeted (text)', async () => {
  expect.assertions(1);
  const data = await testWhatsappFunctionOne();
  expect(data).toEqual('accepted');
});

it('Whatsapp -> Check if status is accpeted (image)', async () => {
  expect.assertions(1);
  const data = await testWhatsappFunctionTwo();
  expect(data).toEqual('accepted');
});

it('Whatsapp -> Check if status is accpeted (video)', async () => {
  expect.assertions(1);
  const data = await testWhatsappFunctionThree();
  expect(data).toEqual('accepted');
});

it('Whatsapp -> Check if status is accpeted (document)', async () => {
  expect.assertions(1);
  const data = await testWhatsappFunctionFour();
  expect(data).toEqual('accepted');
});

it('LINE -> Check if status is accpeted (text)', async () => {
  expect.assertions(1);
  const data = await testLINEFunctionOne();
  expect(data).toEqual('accepted');
});

it('LINE -> Check if status is accpeted (image)', async () => {
  expect.assertions(1);
  const data = await testLINEFunctionTwo();
  expect(data).toEqual('accepted');
});

it('LINE -> Check if status is accpeted (video)', async () => {
  expect.assertions(1);
  const data = await testLINEFunctionThree();
  expect(data).toEqual('accepted');
});
