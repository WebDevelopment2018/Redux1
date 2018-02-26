import expect from 'expect';
import {counter} from 'app';

expect (
    counter(0, { type: 'INCREMENT' })
).toEqual(1);

expect (
    counter(1, { type: 'INCREMENT' })
).toEqual(2);

expect (
    counter(2, { type: 'DECREMENT' })
).toEqual(1);

expect (
    counter(1, { type: 'DECREMENT' })
).toEqual(0);

expect (
    counter(1, { type: 'SOMETHING_ELSE' })
).toEqual(1);

expect (
    counter(undefined, {})
).toEqual(0);

const deepFreeze = require('deep-freeze');
const testAddCounter = () => {
    const listBefore = [];
    const listAfter = [0];

    deepFreeze(listBefore);

    expect(
        addCounter(listBefore)
    ).toEqual(listAfter);
};
const testRemoveCounter = () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 20];
    deepFreeze(listBefore);
    expect(
        removeCounter(listBefore, 1)
    ).toEqual(listAfter);
};
const testIncrementCounter = () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 11, 20];

    deepFreeze(listBefore);

    expect(
        incrementCounter(listBefore, 1)
    ).toEqual(listAfter);
};

testAddCounter();
testRemoveCounter();
testIncrementCounter();

console.log("Tests passed!");