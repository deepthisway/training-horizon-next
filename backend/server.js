const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const rootRouter = require("./routes/mainRouter");
const connectDB = require("./config/db");

const app = express();
const PORTNO = process.env.PORT || 3005;
app.use(cors());
app.use(express.json());

connectDB();

// all routes here
// app.use('/api/v1' , trainer_router)
app.use("/api/v1", rootRouter);

app.get('/', (req, res) => {
  console.log("Welocome to training horizon");
  res.json({
    msg: "Welocome to training horizon"
  })
})

app.listen(PORTNO, () => {
  console.log(`Training-Horizon is serving on port ${PORTNO}`);
});
