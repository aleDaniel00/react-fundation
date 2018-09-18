import sum from './sum';
import { shallow } from 'enzyme';

console.log(shallow);
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toEqual(3);
});