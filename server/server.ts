const express                 = require("express");
const app                     = express();
const email = require('./email.route');

// API Routes
app.use(express.json());
app.use("/api/email", email);
// Listen on PORT
const port = process.env.PORT || 3000;
app.listen(port, 
  () => {
    console.log(`Listening on port ${port}!`)
  }); 

export {}
