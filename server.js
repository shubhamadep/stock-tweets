const model = require('./models/cryptocurrency_info');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const cookieParser = require("cookie-parser");

const port = process.env.PORT || 5000;
const axios = require('axios');
const coinRoutes = require('./routes/cyrptinfo');
//Old herokuDB, Change to new One
const doConnection = require('./config/database');

const userRoutes = require('./routes/user');


const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/cryptinfo',coinRoutes);
app.use("/users", userRoutes);



// Enter the time you want the cache to clear.

  
// var cache = require('express-redis-cache')({ expire: 100 });

// console.log that your server is up and running
//app.listen(port, () => console.log(`Listening on port ${port}`));
//Kamlesh change

doConnection.sync().then(() =>{
    app.listen(port);
    app.on('error', (err) =>{
        console.log("Error",err);
    });
  });


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
