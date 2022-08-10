# whois-node

A Node.js module to preform whois lookups

## Installation

Install the package using NPM:

```bash
npm install whois-node
```

## Usage

```js
const whois = require("whois-node");
whois.lookup("AS13335").then(console.log); // Outputs the ASN information for Cloudflare
```

### Customizable Options

You can customize some options when preforming a lookup. Specify these options in a JSON object as the second paramater in the `lookup()` function.

```js
{
	format: "", // The response output format, this can be TEXT or JSON (defaults to JSON)
	server: "" // The WHOIS server to use for the request (if none is provided, the library will query IANA for the prefered WHOIS server and then proceed to query the server IANA responded with)
}
```

## Support

If you need help or found an issue in the package, please open an issue on [GitHub Issues](https://github.com/milanmdev/whois/issues). If you find a vulnerability, please email me at [milan@milanm.org](mailto:milan@milanm.org).

&copy; Milan Mehra
