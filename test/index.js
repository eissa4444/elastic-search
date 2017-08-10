let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let search = require('../search');
let should = chai.should();
let assert = chai.assert;

chai.use(chaiHttp);

/*
* Test the /GET route
*/
describe('/GET currentlyopen', () => {
    it('it should GET all the currently opened resturants', (done) => {
        chai.request(server)
            .get('/currentlyopen')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});

describe('Get open resturants at 6:00 (6*60) am', function () {
    it('it should return an empty array []', function () {
        search.search('elmenus', 0, 20, 360)
            .then(results => {
                assert.equal(results.length, 0);
            })
    });
});

describe('createBody', function () {
    it('it should create the query body', function () {
        let body = search.createBody(0, 12, 123);
        assert.isObject(body, 'it is an object');
    });
});

