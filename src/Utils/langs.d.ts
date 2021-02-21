export default interface langOption {
  shortName: string;
  fullName: string;
  util: utilOption;
  commands: commandsOption;
}

interface utilOption {
  'something-went-wrong': string;
  'bad-usage': string;
  'my-prefix-is': string;
  'err-execute-command': string;
}

interface commandsOption {
  'no-voc-channel': string;
}