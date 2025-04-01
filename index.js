const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");

const app = express();
app.use(express.json());

dotenv.config();
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Ket noi db thanh cong!")
    })
    .catch((err) => {
        console.log(err)
    })

app.use("/products", productRoute);
app.use("/users", userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));