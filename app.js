require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const examRoutes = require("./routes/exam");
const studentRoutes = require("./routes/student");

const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL;
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(`DB CONNECTION ERR: ${err}`);
  });

app.use("/api", authRoutes);
app.use("/api", examRoutes);
app.use("/api", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
