const mongoose = require("mongoose");
require("dotenv").config();


// Connecting to Database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection
.on("open", () => {
    console.log("Mongoose connection open");
})
.on("error", (err) => {
    console.log(`Connection error: ${err.message}`);
});

// Aquiring models
require('./models/Registration')

// Starting App
const app = require("./app");
const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});
