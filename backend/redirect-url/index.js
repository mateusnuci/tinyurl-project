const RedirectUrl = require('./db');

exports.handler = async (event) => {
  const code = event.pathParameters.code

  try {
    const redirectUrl = await RedirectUrl.findOne({ shortUrl: code })
    if (!redirectUrl) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'URL not found' }),
      }
    }

    if (redirectUrl.expirationDate < new Date()) {
      return {
        statusCode: 410,
        body: JSON.stringify({ message: 'URL expired' }),
      }
    }
    
    return {
      statusCode: 301,
      headers: {
        Location: redirectUrl.url,
      },
    }
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    }
  }
}





