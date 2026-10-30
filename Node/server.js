require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');

const app = express();
app.use(cors());

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
});

app.get('/api/sheet-data', async (req, res) => {
    console.log('1. request received');
    try {
        const client = await auth.getClient();
        console.log('2. got client');
        const sheets = google.sheets({version: 'v4', auth: client});
        
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: 'Calendar'
        });
        console.log('3. got response from Google');

        res.json({ data: response.data.values });
    }
    catch (error) {
        console.error('Sheet fetch error: ', error.message);
        res.status(500).json({ error: 'Failed to fetch sheet data' });
    }

});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));