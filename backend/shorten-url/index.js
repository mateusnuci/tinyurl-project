const RedirectUrl = require('./db');
const { nanoid } = require('nanoid');

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body)
    const shortCode = nanoid(10)
    const expirationDate = body.expirationDate ? new Date(body.expirationDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 

    const newDoc = new RedirectUrl({
      url: body.url,
      shortUrl: shortCode,
      expirationDate: expirationDate,

    })

    await newDoc.save()
  
    return {
      statusCode: 200,
      body: JSON.stringify({ shortCode }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
}

