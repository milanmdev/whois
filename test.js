const whois = require("./index");

whois.lookup("AS7155").then(console.log);
whois.lookup("ipinfo.link").then(console.log);
