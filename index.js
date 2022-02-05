const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");

// DB Setup
const connection_string = "mongodb://localhost:auth/auth";
mongoose
	.connect(connection_string, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then((con) => {
		console.log("Successfully connected to db", con);
	});

//App Setup
// app.use shows its a middleware
app.use(morgan("combined")); // for logging incoming requests
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
router(app);

//Server setup

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on port ", port);
