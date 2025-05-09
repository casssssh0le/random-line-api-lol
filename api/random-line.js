const https = require('https');

module.exports = async function (req, res) {
  const fileUrl = "https://gist.githubusercontent.com/casssssh0le/b6434170a35f866e9884a864530ecc94/raw/b24cc1c36e778bbb4b5d313bab2fcdeb79293b6b/jokes";

  https.get(fileUrl, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      const lines = data.split('\n').filter(line => line.trim() !== '');
      const randomLine = lines[Math.floor(Math.random() * lines.length)];
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end(randomLine);
    });

  }).on('error', (err) => {
    console.error('Error fetching file:', err);
    res.statusCode = 500;
    res.end('Failed to fetch data.');
  });
};
