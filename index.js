require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
var cors = require('cors')
const fileUpload = require('express-fileupload');
const app = express();
app.use(cors({
    origin: "*"
}))
//authenticating json web token
const authenticateMiddleware = require('./middleware/authenticateMiddleware')

app.use(bodyParser.json());
app.use(fileUpload());
//login
app.use('/auth', require('./routers/authRouter'));
app.use('/buses',  require('./routers/busRouter'));
app.use('/busimages', require('./routers/busImageRouter'));
app.use('/users', authenticateMiddleware, require('./routers/userRouter'));
app.listen(4000, (req, res) => {
    console.log("Server is running on port 3000")
})