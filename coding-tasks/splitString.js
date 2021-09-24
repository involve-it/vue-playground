/*
Write a JS function which has the following prototype:
SplitString(inputString, splitParameter);
The function should return an array of elements. It takes the input strings and splits data by “splitParameter”.  Please see the example to understand the whole logic:
The implementation could include only basic JS methods without. Method String.prototype.split() and external libraries are not allowed.
 */

class Caret {
  str = '';
  pos = -1;
  fragment = '';
  isStart = false;
  isEnd = false;
  constructor(str) {
    this.str = str;
  }
  read() {
    let ret;

    if (this.pos >= this.str.length - 1) {
      this.reset();
      this.isEnd = true;
      ret = undefined;
      this.fragment += '_';
    } else {
      if (this.isEnd) { this.isEnd = false }
      if (this.pos === -1) {
        this.isStart = true;
      } else {
        this.isStart = false;
      }
      this.pos += 1;
      ret = this.str[this.pos];
      this.fragment += ret;
    }
    return ret;
  }
  cut() {
    const ret = this.fragment.substr(0, this.fragment.length - 1);
    this.fragment = this.fragment[this.fragment.length - 1];
    return ret;
  }
  reset() {
    this.isStart = false;
    this.isEnd = false;
    this.pos = -1;
  }
}

const SplitString = (inputString, splitParameter) => {
  if (inputString === undefined || splitParameter === undefined) {
    throw new Error('incorrect params');
  }
  if (inputString.length <= splitParameter.length) {
    return [inputString];
  }

  const res = [];
  let curInpSymb, curSplitSymb;
  const inputCaret = new Caret(inputString);
  const splitCaret = new Caret(splitParameter);

  do {
    curInpSymb = inputCaret.read();
    curSplitSymb = splitCaret.read();
    if (inputCaret.isEnd
    || curInpSymb === curSplitSymb && splitCaret.isStart
    || curInpSymb !== curSplitSymb && splitCaret.isEnd) {
      const fragment = inputCaret.cut();
      if (fragment) {
        res.push(fragment);
      }
    } else {
      if (curInpSymb !== curSplitSymb) {
        splitCaret.reset();
      }
    }
  } while (!inputCaret.isEnd);
  return res;
}

module.exports = { SplitString }
