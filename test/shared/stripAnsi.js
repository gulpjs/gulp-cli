var ansiPattern = [
  '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
  '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))',
].join('|');
var ansiRegex = new RegExp(ansiPattern, 'g');

function stripAnsi(value) {
  return value.replace(ansiRegex, '');
}

module.exports = stripAnsi;
