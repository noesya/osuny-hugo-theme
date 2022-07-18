const Elastic = require("elasticsearch");
const ndjson = require("ndjson");
const fs = require("fs");

const client = new Elastic.Client({host: 'localhost:9200'});

const fetchBulkJson = () => {
    return new Promise((resolve, reject) => {
      let lines = [];

      fs.createReadStream("./public/elasticsearch.json")
        .pipe(ndjson.parse())
        .on("data", line => lines.push(line))
        .on("end", () => resolve(lines))
        .on("error", err => reject(err));
    });
};

// Perform the bulk index operations in a single API call.
const bulkUpload = async () => {
    const json = await this.fetchBulkJson();
    return await client.bulk({ body: json });
};

bulkUpload();