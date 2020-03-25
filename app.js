const express = require('express');
const connectDB = require("./config/db");

const app = express();

app.set("view engine", "ejs");

// database connection
connectDB();

app.use(express.json({extended:false}));
app.use(express.urlencoded({ extended: true }));

app.use("/admin", require("./routes/admin"));
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

const PORT =  process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Ryby utekajú na porte: "+PORT)
});