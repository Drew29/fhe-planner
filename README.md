# FHE Planner

**Created by:** Drew Schoeny

### I made this to help my ward plan FHE activities

## How it works

- Data about the activities we are planning is saved on a Google Sheet
- A Node.js script retrieves the data from the google sheet
- A Vue.js script requests the data from the node.js script and updates the website when it is loaded.
- The node.js script exists as a middleman. Users can only access what is in the vue.js file, which requests the data from the node.js script. The node.js script holds the access keys to the Google Sheet and it decides what leaves the server and what the user sees.

## Usage instructions

- Install Node on your computer/server
- Create a google sheet of data
- Copy the .env.example file to a .env file and fill in the relevant information related to your google sheet. Using Google Cloud Services:
    - Create a project
    - Create a service account
    - Enable the Sheets API
    - Download the key and copy the 2 values into .env (note: do not make the keys publicly available, because anyone with the keys can access any data the account is connected to)
    - Copy the Google Sheet id into the other .env value (it's located between the d/ and the /edit in the url)
    - Share the sheet with the service account's email
- Run the terminal command "npm install" in the Node directory (just once). You can now run "node server.js" in the same directory and "Server is running on port: 3000" should appear in the terminal.
- Run "npm install" in the Vue directory (just once). You can now run "npm run dev" in the same directory and the terminal will print an address to the website that is run locally on your computer.

### Planned improvements
- Budget calculations (how much we can spend per month, with it automatically updating if we spend over/under that amount each month)
- Suggestions for planning activities (such as who can lead it, what activities to do)
- Login/security