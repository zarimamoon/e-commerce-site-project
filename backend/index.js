const express = require("express");
const cors = require("cors");

// const products

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) =>{
    res.send("Welcome to my online store!")
})

app.get("/products", (req, res) =>{
    res.send([])
})

const port = process.env.PORT || 8080
app.listen(port, console.log(`Server is running on port ${port}`));