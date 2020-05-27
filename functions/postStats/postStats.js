/* eslint-disable */
const fetch = require("node-fetch");
const nanoid = require('nanoid');
const sanityClient = require('@sanity/client')
// Add these environment variables to Netlify
const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  // Generate a token with write rights on manage.sanity.io
  token: process.env.SANITY_WRITE_TOKEN
})

exports.handler = async function(event, context) {
  try {
    const { body} = event;
    const {_id, number} = body

    const response = await client
      .patch(_id)
      // add an answers array, of not from before
      .setIfMissing({answers: []})
      // insert the new guess
      .insert('after', 'answers[-1]', [
        // make a key to be compatible with editing in studio
        {_key: nanoid(), guess: number, date: new Date()}
      ])
      .commit()
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data })
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
