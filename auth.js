const { google } = require('googleapis');
const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

//set the credentials
oauth2Client.setCredentials({ access_token: 'your_access_token' });

module.exports = oauth2Client;
