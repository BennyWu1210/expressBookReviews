const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());


app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    const accessToken = req.session.accessToken;

    if (!accessToken) {
        res.status(401).send('Access Denied: No token provided.');
        return;
    }

    verifyToken(accessToken, (err, payload) => {
        if (err) {
            // Handle error (token might be invalid, expired, etc.)
            res.status(401).send('Access Denied: Invalid token.');
        } else {
            // Token is valid. Store payload in request for use in your route handlers.
            req.user = payload;
            next(); // proceed to the next middleware/route handler
        }
    });
});
 
const PORT =5001;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
