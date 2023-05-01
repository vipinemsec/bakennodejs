

const express = require('express')
var bodyParser = require('body-parser');
const app = express()
var mongodb = require('mongodb');

require("../testapi/conn");
const deModel = require("../testapi/schema")
const leModel = require("../testapi/leakshema");
// console.log(demodel.find({domain:superchoice}),"for domain");
const axios = require('axios');
app.use(bodyParser.json());
app.use(express.json());

app.listen(3000);
app.get('/', (req, res) => {
    res.send("you are workinhgto build api");
    console.log("working to build api");
})
app.get('/search', async (req, res) => {

    const domainName = req.body.domain;
    let dcollection;
    let lecollection;
    let dedata;
    //    let  tepmcollection = await deModel.find({domain:domainName});
    //    console.log("for temp db", tepmcollection);

    // for dehased serach
    try {
        dcollection = await deModel.find({ domain: domainName });
        //    console.log("in the try sectino",dcollection)
    }
    catch {
        if (dcollection == undefined) {
            const url = `https://api.dehashed.com/search?query=domain:${domainName}&size=30000 &page=1`;
            const res1 = await axios.get(
                url,
                {
                    auth: {
                        username: 'dev@emsec.uk',
                        password: 'x23tlnd4eftupv8pjbrvihy7bp57cnwe'

                    },
                    headers: {
                        'Accept': 'application/json'
                    }
                }
            );
            dedata = res1.data.entries;
            const obj = {
                "domain": `${domainName}`,
                "data": dedata
            };
            const db = new deModel(obj);
            // const p= await db.save()

        }
    }
    // for leaklookup search to get data serach
    try {
        lecollection = await leModel.find({ domain: domainName });
    } catch {
        if (lecollection == undefined) {
            try {
                const response = await axios.get('https://leak-lookup.com/api/search', {
                    key: "96f8eb26076919781f2ef87dfcb05a91",
                    type: 'domain',
                    query: `${domainName}`,
                    headers: {
                        'Accept':'application/x-www-form-urlencoded'
                    }
                });
            console.log("for leaklookup",response)    
            res.json({
                mag:"working on leekloookup",
                data:response
            })
            } catch (error) {
                console.error(error);
                res.status(500).send('Error occurred while searching for leaks');
            }
        }

    }
}
    // dedatabse=result.db("Dehashed1");

)
// console.log("for databse",dedatabse)