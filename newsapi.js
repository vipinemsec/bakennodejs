const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/news', async (req, res) => {
  const newsitem = req.body.news;
  try {
    const url= `https://newsapi.org/v2/everything?q='${newsitem}'&apiKey=83d7a636b53f40f287ae6e71f0b8e072`

    const response= await axios.get(url);
    // const res2=JSON.stringify(response)
    res.send(response.data.articles);
    console.log(response.data)
    console.log("working on newsapi");
console
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while searching for leaks');
  }
});

app.listen(port, () => {
  console.log('connection is working on port', port);
});
