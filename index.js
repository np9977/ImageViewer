// ES Modules syntax
import Unsplash from 'unsplash-js';

// require syntax
const Unsplash = require('unsplash-js').default;
var express = require('express')
var app = express()

var port = process.env.PORT || 8080;

const unsplash = new Unsplash({
    applicationId: "df88c8a8007e2344ea37ee5c9300f1b818e6653a21e53baf326df508306c0514",
    secret: "163215cb579c8ee5dc8c374404cb09eb7e945cffb7ac8341775587bf6ac548b4",
    callbackUrl: "{CALLBACK_URL}"
});

// An express router
var router = express.Router();55

// Home page
router.get('/', function(req, res) {
    res.send('/index.html');
});


app.use('/', router);

app.listen(port);
console.log('Listening on port ' + port);5