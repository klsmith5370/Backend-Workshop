const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const logger = require("./utils/logger");

dotenv.config({ path: "./config/config.env" })

connectDB();

const app = express();

app.use(bodyParser.json())

const PORT = process.env.PORT || 5001;

app.use(logger);

const server = app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`)
    server.close(() => process.exit(1))
});