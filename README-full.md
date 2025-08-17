# Country Info Chatbot (Amazon Lex V2 + AWS Lambda)

A simple Lex V2 bot backed by a Lambda function that returns a country’s **capital, currency, and language**.

## How it works
- **Lex V2** collects the `Country` slot in intent `GetCountryInfo`.
- **Lambda** formats the reply and returns it to Lex.

## Quick start (you already did most!)
1. Create a Lambda function (Node.js 22.x) and attach it to your Lex bot alias (Languages ▸ English (US) ▸ Lambda function).
2. Paste the code from [`/lambda/index.js`](lambda/index.js) into Lambda (or upload as a ZIP).
3. Test the bot: “Tell me about India”.

## Sample utterances
- *Tell me about India*
- *Country info: Japan*
- *What’s the capital of Germany?* (Lex will still route to `GetCountryInfo` via the `Country` slot)

## Files
- `lambda/index.js` – Lambda handler (Lex V2 code hook response format)
- `lambda/package.json` – Lambda metadata (commonjs)
- `docs/` – optional screenshots for README

## Notes
- The dataset is tiny (India, Japan, Germany, France). Add more in `COUNTRY_DATA`.
- Works with **Node.js 22.x** in Lambda (CommonJS).

## License
MIT – see [LICENSE](LICENSE).
