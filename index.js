const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");

const app = express();
const reviewRouter = require("./routers/reviews");


app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello server is runningh')
    .end();
});

mongoose.connect(
  "mongodb+srv://ayo:Replayz1.@cluster0.mdicy.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const con = mongoose.connection;

con.on("open", () => {
  console.log("connected to db");
});

app.use(express.json());
// add helmet to protect the app from some common vulnerabilities
app.use(helmet());
// CORS error	
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/reviews", reviewRouter);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("listening on port 8080");
});
