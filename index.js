const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://fake_user:5PsL7kuPOX7PZxTz@cluster0.w5gtl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);
async function run() {
    try {
        await client.connect();
        const database = client.db('fake_shop');
        const productCollection = database.collection('fakeProducts');
    
        // const orderCollection = database.collection('orders');

        //GET Products API
        app.get('/products', async (req, res) => {
           const cursor = productCollection.find({});
           const products = await cursor.toArray();
           res.send(products)

    
        })
   }
     finally {
       // await client.close();
    }
 }

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('FakeData server is running');
});

app.listen(port, () => {
    console.log('Server running at port', port);
})
