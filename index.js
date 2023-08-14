const express = require("express")
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.json());
//login
app.use('/auth', require('./routers/authRouter'));
app.use('/buses', require('./routers/busRouter'));
app.use('/users', require('./routers/userRouter'));
app.listen(3000, (req, res) => {
    console.log("Server is running on port 3000")
})