const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.json());

const port = process.env.PORT || 3000;

app.post('/leak', async (req, res) => {
  const domainName = req.body.domain;
  try {
    const response = await axios.post(
      'https://leak-lookup.com/api/search',
      {
        type: 'domain',
        query: domainName,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'API-Key': '96f8eb26076919781f2ef87dfcb05a91', // Add your API key here
        },
      }
    );
    const ledata = response.data;
    console.log('for leaklookup', ledata);
    console.log(domainName);
    res.json({
      msg: 'working on leekloookup',
      data: ledata,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while searching for leaks');
  }
});

app.listen(port, () => {
  console.log('connection is working on port', port);
});
