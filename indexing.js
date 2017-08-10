(function () {
  const fs = require('fs');
  const elasticsearch = require('elasticsearch');
  const esClient = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
  });

  const bulkIndex = function bulkIndex(index, type, data) {
    let bulkBody = [];
    data.forEach(item => {
      bulkBody.push({
        index: {
          _index: index,
          _type: type,
          _id: item.id
        }
      });
      bulkBody.push(item);
    });

    esClient.bulk({body: bulkBody})
    .then(response => {
      let errorCount = 0;
      response.items.forEach(item => {
        if (item.index && item.index.error) {
          console.log(++errorCount, item.index.error);
        }
      });
      console.log(`Successfully indexed ${data.length - errorCount} out of ${data.length} items`);
    })
    .catch(console.err);
  };

  const indexResturants = function indexResturants() {
    const resturantsRaw = fs.readFileSync('data/resturants.json');
    const resturants = JSON.parse(resturantsRaw);
    console.log(`${resturants.length} items parsed from data file`);
    bulkIndex('menus', 'resturant', resturants);
  };

  indexResturants();

//to use it in other modules
  module.exports = {
    bulkIndex
  };
} ());