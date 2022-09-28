const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

// env
dotenv.config();

// db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected succesfully"))
  .catch((error) => {
    console.log(error);
  });

// Domains allowed
// const whitelist = [process.env.FRONTEND_URL];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Error de CORS"));
//     }
//   },
// };

// back🤝front
// app.use(cors(corsOptions));
app.use(cors());

// allow json
app.use(express.json());

// routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/checkout", stripeRoute);

// port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running @ ${process.env.PORT}`);
});
