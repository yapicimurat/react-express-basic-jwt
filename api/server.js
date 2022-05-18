const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('port', process.env.PORT || 3005);

//APP MIDDLEWARE FOR BODY PARSER...
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/hello-world', (req, res) => {
    res.json({
        "welcome-message": "Hello World!"
    });
});

app.listen(app.get('port'), () => { console.log(`API is ready to listen on port ${app.get('port')}`);})