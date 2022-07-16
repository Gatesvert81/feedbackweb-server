This repository is the server to [Feedback Web App](https://github.com/Gatesvert81/Feedback-Website).Feedback Web App is a interractive comment section made with Nextjs (Reactjs), StyledComponents and MySQL database for storing data.

## Getting Started

First, clone repository and server repository:
- feedback web
```
git clone https://github.com/Gatesvert81/Feedback-Website
```

- feedback server
```
git clone https://github.com/Gatesvert81/feedbackweb-server
```


Second, go to each folder and install all neccessary packages:
- feedbackweb;
```
$ cd feedbackweb
$ npm install
```
- feedback server;
```
$ cd server
$ npm install
```

Lastly, run on development mode:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.


## Web App Flow
There are two main folders in this app
- Feedbackweb
- Server

# Feedback Web
This is the front-end part of the website made with [Next.js](https://nextjs.org/docs).js. It contains ;
- src folder: This contains all components and stying
- pages which contains all pages in the website. There are simple codes which can be easily understood and changed.

# Server
This is the server that reciees get and post request and interacts withe the database (MySQL) to deliver responses. It contains;
- `app.js` file which contains all post and get requests.
- `dbService.js` file contains all database functions fro authentication to storing of feedbacks

## Progress
This Website has not been deployed because I'm currently unable to verify my heroku server account to enable connection with backend. Neithertheless, its an amazing fullstack project and will hopefully settle m issues with heroku server and deploy it soon.




