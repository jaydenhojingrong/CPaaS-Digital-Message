import { add } from '../src/index';
import { check } from '../src/index';

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
    expect(check('telegram')).toBe("Whatsapp");
  });
  test('Both channels', () => {
    expect(check('LINE, Whatsapp')).toBe("LINE, Whatsapp");
  });
});