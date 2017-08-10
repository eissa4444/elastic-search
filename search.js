const elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
});

const search = function (index, from, size) {
    let body = createBody(from, size);
    return esClient.search({ index: index, body: body });
};

const createBody = function (from, size) {
    let date = new Date();
    let now;
    console.log(date.getHours())
    if (date.getHours() < 10) {
        now = (date.getHours() * 60) + date.getMinutes() + (24 * 60);
    } else {
        now = (date.getHours() * 60) + date.getMinutes();
    }
    console.log(now);
    let body = {
        size: size,
        from: from,
        query: {
            bool: {
                must: [
                    {
                        range: {
                            opening_hr: {
                                lte: now
                            }
                        }
                    },
                    {
                        range: {
                            closing_hr: {
                                gte: now
                            }
                        }
                    }
                ]
            }
        }
    }
    return body;
};
createBody(0,30);
module.exports = search;