// require syntax
const Unsplash = require('unsplash-js').default;
var express = require('express')
var app = express()



require('es6-promise').polyfill();
require('isomorphic-fetch');

var port = 2000;

const unsplash = new Unsplash({
    applicationId: "df88c8a8007e2344ea37ee5c9300f1b818e6653a21e53baf326df508306c0514",
    secret: "163215cb579c8ee5dc8c374404cb09eb7e945cffb7ac8341775587bf6ac548b4",
    callbackUrl: "{CALLBACK_URL}"
});

app.get('/', function (req, res) {
    res.send("Random Image Viewer API");
});

// Get 'numImages' number of images 
app.get('/random/:numImages', function (req, res) {
    unsplash.photos.getRandomPhoto({count: req.params.numImages})
        .then(toJson)
        .then(json => {
            res.send(json);
        });
});

// Listen for requests
app.listen(port, function () {
    console.log('App listening on port' + port);
})