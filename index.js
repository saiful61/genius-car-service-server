const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();

const app = express();

//middleware

app.use(cors());
app.use(express.json())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e0f6x.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('geniusCar').collection('services');

        app.get('/service', async (req, res) => {
            const qurey = {};
            const cursor = serviceCollection.find(qurey);
            const services = await cursor.toArray();
            res.send(services);
        });
        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const qurey = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(qurey);
            res.send(service);
        })

        app.post('/service', async (req, res) => {
            const newService = req.body;
            const result = await serviceCollection.insertOne(newService);
            res.send(result);
        })
        app.delete('/service/:id', async (req, res) => {
            const id = req.params.id;
            const qurey = { _id: ObjectId(id) }
            const result = await serviceCollection.deleteOne(qurey);
            res.send(result)
        })
    }
    finally {

    }

}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Rinning genius car')
});

app.listen(port, () => {
    console.log('Listening to port', port)
})