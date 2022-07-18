const HES = require('hugo-elasticsearch');

const Indexer = new HES({
    input: 'content/**',
    output: 'public/static/elasticsearch.json',
    language: 'yaml',
    delimiter: '---',
    indexName: 'posts'
});

// Create index
Indexer.index();

// Setters
Indexer.setInput('content/blog/**');
Indexer.setOutput('public/static/elasticsearch.json');
Indexer.setLanguage('yaml');
Indexer.setDelimiter('---');
Indexer.setIndexName('posts');
