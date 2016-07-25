const Spotify = require('spotify-web-api-node');
const {clientId, clientSecret} = require('./secrets');

function getCredentials() {
  return {
    clientId : clientId,
    clientSecret : clientSecret
  };
}

function setAccessToken(client) {
  client.clientCredentialsGrant().then(data => client.setAccessToken(data.body.access_token));
}

module.exports = {
  createClient() {
    const client = new Spotify(getCredentials());
    setAccessToken(client);
    return client;
  }
};
