const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send("Welcome to the 9ino6ano App!!")
});

app.listen(3000, function () {
    console.log("App:9ino6ano listening on port 3000")
});
