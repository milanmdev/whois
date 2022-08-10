const changeCase = require("change-case");
const DEFAULT_DELIMITER = ":";

const getCommonDelimiterForm = function (rawData, delimiter) {
  const delimiterPattern = new RegExp(delimiter + "\\S+", "g");
  const delimiterWSpacePattern = new RegExp(delimiter + " ", "g");
  const delimiterMatches = rawData.match(delimiterPattern) || [];
  const delimiterWSpaceMatches = rawData.match(delimiterWSpacePattern) || [];

  if (delimiterMatches.length > delimiterWSpaceMatches.length) {
    return delimiter;
  }
  return delimiter + " ";
};

const parseRawData = function (rawData) {
  let result = {};

  rawData = rawData.replace(/:\s*\r\n/g, ": ");
  let lines = rawData.split("\n");
  let delimiter = getCommonDelimiterForm(rawData, DEFAULT_DELIMITER);

  lines.forEach(function (line) {
    line = line.trim();
    if (line.startsWith("%") || line.startsWith("#")) {
      return;
    }

    if (line && line.includes(delimiter)) {
      let lineParts = line.split(DEFAULT_DELIMITER);
      if (lineParts.length >= 2) {
        let key = changeCase.camelCase(lineParts[0]),
          value = lineParts.splice(1).join(DEFAULT_DELIMITER).trim();

        if (key in result) {
          result[key] = `${result[key]} ${value}`;
          return;
        }
        result[key] = value;
      }
    }
  });

  return result;
};

module.exports = parseRawData;
