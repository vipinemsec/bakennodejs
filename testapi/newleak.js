



const express = require('express');
const app = express();
const axios = require('axios');
const { json } = require('body-parser');
const { signedCookie } = require('cookie-parser');

app.use(express.json());
const port = process.env.PORT || 3000;
app.get('/leak', async (req, res) => {

    const domainName = req.body.domain;

    const API_URL = 'https://leak-lookup.com/api/search';
    const API_KEY = "96f8eb26076919781f2ef87dfcb05a91";
    const DOMAIN = `${domainName}`;
    // **** replace response with lld anf comment require json file *****
    let lld;
    try {
        lld = await axios.post(API_URL, {
            key: `${API_KEY}`,
            type: 'domain',
            query: `${DOMAIN}`
        });
        res.send(lld.data)
    } catch (error) {
        console.error(error);
    }

    /*const domainName = req.body.domain;
   const API_KEY = "96f8eb26076919781f2ef87dfcb05a91";
    try {
        const response = await axios.post('https://leak-lookup.com/api/search', {

            key: ` ${API_KEY}`,
            type: 'domain',
            domain: `${domainName}`

        });
        const ledata = response.data;
        console.log("for leaklookup", ledata, response.data)
        // console.log(domainName)
        res.send(ledata)
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while searching for leaks');
    }
*/
})

app.listen(port, () => {
    console.log("connection is working on port", port);
})
