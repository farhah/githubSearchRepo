# server
Open .env file and change CLIENT_ID and CLIENT_SECRET according to your github oauth application that you set up earlier on github

PORT=5000

CLIENT_ID=yourclientid
CLIENT_SECRET=yourclientsecret
REDIRECT_URI=http://localhost:5000/api/auth/oauth-callback
FRONTEND_URI=http://localhost:8080

Make sure FRONTEND_URI has the same port as the client


## Mongodb
Install mongodb

Open server.js and change yourDbName to the one you created on mongodb
mongoose.connect('mongodb://localhost/yourDbName', {


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Test
```
npm test
```

