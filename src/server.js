const express = require('express');
const PORT = process.env.PORT || 8000;
const router = require("./router/routes")

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router)

app.listen(PORT, () => console.log(PORT));
