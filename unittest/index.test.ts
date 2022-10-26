import { testLINEFunctionOne, testLINEFunctionThree, testLINEFunctionTwo } from '../src/index';
import { testcontact, makeRequest } from '../src/index';
import { testWhatsappFunctionOne, testWhatsappFunctionTwo, testWhatsappFunctionThree, testWhatsappFunctionFour } from '../src/index';
import { testLinecontact } from '../src/index';

it('health checker', async () => {
  expect.assertions(1);
  const data = await makeRequest();
  expect(data).toEqual(200);
});

it('Retrieve contacts -> Check if it is WhatsApp or LINE', async () => {
  expect.assertions(1);
  const data = await testcontact();
  expect(data).toEqual('True')
});

it('Retrieve LINE contacts -> Check if custom 1 have value', async () => {
  expect.assertions(1);
  const customdata = await testLinecontact();
  expect(customdata).toEqual('True')

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
