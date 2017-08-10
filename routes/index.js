let express = require('express')
let router = express.Router();
let querystring = require('querystring');
let search = require('../search.js').search;

//register end point  
router.get('/currentlyopen', function (req, res, next) {
    let from = req.query.from;
    let size = req.query.size;
    let date = new Date();
    let now = (date.getHours() * 60) + date.getMinutes();
    search('elmenus', from, size, now)
        .then(results => {
            res.json(results.hits.hits)
            next();
            //results.hits.hits.forEach((hit, index) => console.log(hit._source));
        })
        .catch(console.error);
});


module.exports = router;
