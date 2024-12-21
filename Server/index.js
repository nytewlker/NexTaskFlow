const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/auth");
const dbConnect = require("./db/dbConnect");
const contactRoutes = require("./routes/contactRoutes");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'https://careervista.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
}));
dbConnect();

app.use("/api/users", userRoutes);
app.use("/api", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
