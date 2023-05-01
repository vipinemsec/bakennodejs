
const express = require("express");
const axios = require('axios');
const leaks = require('./leaks');
const bodyParser = require('body-parser');

require("./config");

const app = express();

//middleware

app.use(express.json());

// parse application/json with a higher limit because request  body is too large to post all data at once
app.use(bodyParser.json({ limit: '1000mb' }));


//routes
const chunkSize = 100;
app.get('/leaks', async (req, res) => {
    try {
        const domainName = req.query.domain;
        const regex = new RegExp(`${domainName}\\b`, "i");
        const users = await leaks.find({ email: regex }).maxTimeMS(30000);
        if (users.length === 0) {
            const response = await axios.get(`https://api.dehashed.com/search?query=domain:${domainName}&size=10000&page=1`, {
                auth: {
                    username: 'dev@emsec.uk',
                    password: 'x23tlnd4eftupv8pjbrvihy7bp57cnwe'
                },
                headers: {
                    'Accept': 'application/json'
                }
            });
            const dataDump = response.data.entries;
            //console.log(dataDump);
            async function postData() {
                for (var i = 0; i < dataDump.length; i += chunkSize) {
                    const chunk = dataDump.slice(i, i + chunkSize);
                    try {
                        const res = await axios.post("http://localhost:3000/dump", chunk);
                        //console.log(res.data);
                    } catch (err) {
                        console.error(err);
                    }
                }
            }
            postData();
            //await axios.post('http://localhost:3000/dump', dataDump);
            res.send(dataDump);
        }
        else {
            res.send(users);
        }
    } catch (error) {
        console.log("Error while hitting leaks: ",error);
        res.status(500).send('Error fetching data');
    }
});

app.post('/dump', async (req, res) => {
    try {
        let result = [];
        //console.log("inside post")
        let data = req.body;
        for (const item of data) {
            const leak = new leaks(item);
            result.push(await leak.save());
        }
        res.status(201).send(result);
    } catch (error) {
        console.log("Error while hitting dump: ",error);
        console.log("**********************error caught**************************")
        res.status(500).json({ error });
    }
});


app.listen(3000, () => {
    console.log(`Server started at port 3000`);
}).on('error', (err) => {
    console.error(`Error starting server: ${err.message}`);
});
