/*
Write a JS function which has the following prototype:
SplitString(inputString, splitParameter);
The function should return an array of elements. It takes the input strings and splits data by “splitParameter”.  Please see the example to understand the whole logic:
The implementation could include only basic JS methods without. Method String.prototype.split() and external libraries are not allowed.
*/

const { SplitString } = require('./splitString');

test('Split String-Original', () => {
  const res = SplitString('ABBCCDDEEBBAABB', 'BB');
  expect(res).toEqual(['A', 'BB', 'CCDDEE', 'BB', 'AA', 'BB']);
});

test('Split String-Original extended', () => {
  const res = SplitString('AABBCCDDEEBBAABB', 'BB');
  expect(res).toEqual(['AA', 'BB', 'CCDDEE', 'BB', 'AA', 'BB']);
});

test('Split String-empty', () => {
  const res = SplitString('ABBCCDDEEBBAABB', '');
  expect(res).toEqual(['A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'B', 'B', 'A', 'A', 'B', 'B']);
});
test('Split String-whole', () => {
  const res = SplitString('ABBCCDDEEBBAABB', 'ABBCCDDEEBBAABB');
  expect(res).toEqual(['ABBCCDDEEBBAABB']);
});
