require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect.js");

// middlewares
const authMiddleware = require("./middleware/authentication.js");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());

// routes
const authRouter = require("./routes/auth.js");
const runsRouter = require("./routes/runs.js");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/runs", authMiddleware, runsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
