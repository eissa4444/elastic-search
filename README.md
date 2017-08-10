# elastic-search demo

## Requirements

* [Node.js](http://nodejs.org/) (min version v0.11.0)
* [Java Runtime Environment](https://java.com/en/) (min version 1.8)
* [Elasticsearch](https://www.elastic.co/)

## Installation Steps

1. Clone repo
2. Run `npm install` : to install all the project dependencies
3. Start Elasticsearch
4. Run `npm run indexing`: to index all the resturand into elasticsearch
5. Run `npm start` : to start the node server 'll open at `http://localhost:8080`
6. Run `npm test` : to run the unit tests 

## End points

`GET /currentlyopen`
## now you can hit `http://localhost:8080/currentlyopen` on the browser and get the response

## you can also paging by setting the `from` and `size` parameters `http://localhost:8080/currentlyopen?from=0&size=12`

## List of files in this repo:

1. `resturant.json`: sample data file
2. `indexing.js`: script for indexing the data in elasticsearch
3. `routes/index.js`: script for the api endpoints
4. `search.js`: script for connecting to elasticsearch and make queries
5.`python_scripts/script.py`: script for converting the opening and closing time columns into minutes
6.`test/index.js`: script contain unit tests
