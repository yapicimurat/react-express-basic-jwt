const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");
app.set('port', process.env.PORT || 3005);

//APP MIDDLEWARE FOR BODY PARSER...
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    allowedHeaders: "*",
    methods: "*"
}));

app.get('/hello-world', (req, res) => {
    res.json({
        "welcome-message": "Hello World!"
    });
});


const mockUser = {
    id: 1,
    username: "muratyapici",
    password: "kalem123"
};


const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        //Response Forbidden...
        res.sendStatus(403);
    }
};


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        if (username === mockUser.username, password === mockUser.password) {

            jwt.sign({ mockUser }, 'secretKey',
                {
                    algorithm: "HS256",
                    expiresIn: "10m" //1 minute-> 60.000 milliseconds
                }, (err, token) => {
                    if (err) {
                        res.sendStatus(403);
                    } else {
                        res.json({
                            accessToken: token
                        });
                    }
                });

        } else {
            res.json({
                error: false,
                message: "Username or password is not correct..."
            });
        }
    } else {
        res.json(
            {
                error: true,
                message: "Some values are missing...",
            }
        )
    }

});

app.get('/getProducts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                result: [
                    {
                        id: 1,
                        name: "product-1",
                        price: 1000,
                        moneyType: "₺"
                    },
                    {
                        id: 2,
                        name: "product-2",
                        price: 540,
                        moneyType: "$"
                    }
                ],
                authData: authData
            });
        }
    });
});

app.listen(app.get('port'), () => { console.log(`API is ready to listen on port ${app.get('port')}`); })