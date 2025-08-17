// lambda/index.js
// Minimal Lambda for Amazon Lex V2 (Node.js 18+/22) + simple fallback for direct tests

const countryData = {
  India:   { capital: "New Delhi", currency: "Indian Rupee", language: "Hindi, English" },
  Japan:   { capital: "Tokyo",     currency: "Yen",          language: "Japanese" },
  Germany: { capital: "Berlin",    currency: "Euro",         language: "German" },
  France:  { capital: "Paris",     currency: "Euro",         language: "French" },
};

const norm = s => (s || "").trim().toLowerCase();

exports.handler = async (event) => {
  // Read Country from Lex V2 slot OR from a raw test event (event.country)
  const raw =
    event?.sessionState?.intent?.slots?.Country?.value?.interpretedValue ||
    event?.sessionState?.intent?.slots?.Country?.value?.originalValue ||
    event?.country;

  const key = Object.keys(countryData).find(k => norm(k) === norm(raw));
  let text;

  if (key) {
    const info = countryData[key];
    text = `The capital of ${key} is ${info.capital}. The currency is ${info.currency}, and the main language is ${info.language}.`;
  } else {
    text = `Sorry, I don't have information about ${raw || "that country"}.`;
  }

  // If event looks like a Lex V2 request, return a Lex V2-style response
  if (event?.sessionState && event?.bot?.id) {
    return {
      sessionState: {
        ...event.sessionState,
        dialogAction: { type: "Close" },
        intent: { ...event.sessionState.intent, state: "Fulfilled" },
      },
      messages: [{ contentType: "PlainText", content: text }],
      requestAttributes: event.requestAttributes,
    };
  }

  // Fallback shape (useful for Lambda console test)
  return { statusCode: 200, body: JSON.stringify({ message: text }) };
};
