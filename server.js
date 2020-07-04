const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
global.config = require("./config");

const routeHandler = require('./routes/index');


app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,x-access-token", "Authorization", "X-Requested-With"
    );

    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", routeHandler);

app.all("*", (req, res) => {
    return res.status(404).json({
        success: false,
        msg: "404 Error - Not Found"
    });
});



// if ((process.env.NODE_ENV) !== 'production') {
//     app.use(logger('dev'));
// }



app.listen(config.port, config.ip, () => {
    console.log(`Server is running on ${config.ip}:${config.port}`)
    
})