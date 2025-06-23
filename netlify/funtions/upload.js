const axios = require('axios');
const FormData = require('form-data');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Nur POST erlaubt' };
  }

  const { SANITY_TOKEN, SANITY_PROJECT_ID, SANITY_DATASET } = process.env;
  const { image } = JSON.parse(event.body || '{}');

  if (!image) return { statusCode: 400, body: 'Kein Bild erhalten' };

  const imageBuffer = Buffer.from(image.split(',')[1], 'base64');
  const mimeType = image.match(/data:(.*);base64/)[1];

  const form = new FormData();
  form.append('file', imageBuffer, { filename: 'upload.jpg', contentType: mimeType });

  try {
    const uploadRes = await axios.post(
      `https://api.sanity.io/v1/assets/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}`,
      form,
      {
        headers: {
          Authorization: `Bearer ${SANITY_TOKEN}`,
          ...form.getHeaders(),
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(uploadRes.data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: 'Fehler beim Upload',
    };
  }
};
