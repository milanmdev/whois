const whois = require("whois");
const parse = require("./parse");
const Util = require("util");

const lookupFunction = Util.promisify(whois.lookup);

const getServerFromIANA = async (query) => {
  try {
    let lookupData = await lookupFunction(query, { server: "whois.iana.org" });

    let dataString = lookupData.toString();
    if (!dataString) return "whois.ripe.net";
    let dataSecond = dataString.split("\n");
    let referString = dataSecond.find((item) => item.startsWith("refer"));
    if (!referString) return "whois.ripe.net";
    let referUrl = referString.split(":")[1];
    referUrl = referUrl.replace(/\s/g, "");

    return referUrl;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  lookup: async (query, options) => {
    if (!query) throw new Error("Value 'query' is required");

    try {
      let server;
      if (!options?.server) {
        server = await getServerFromIANA(query);
        if (typeof server.toLowerCase() == "error") throw new Error(server.err);
      } else {
        server = options?.server;
      }

      const lookupData = await lookupFunction(query, {
        server,
      });
      if (!lookupData) throw new Error("No data recieved from whois server");
      if (options?.format == "TEXT") return lookupData;
      const parsed = parse(lookupData);

      return parsed;
    } catch (e) {
      throw new Error(e);
    }
  },
};
