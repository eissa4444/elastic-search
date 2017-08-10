const elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
});

const search = function (index, from, size, now) {
    let body = createBody(from, size, now);
    return esClient.search({ index: index, body: body });
};

const createBody = function (from, size, now) {

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

module.exports = {
    search: search,
    createBody: createBody
};
