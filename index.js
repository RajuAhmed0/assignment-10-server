const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c9gyi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // await client.connect();
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Database & Collection
        const sportsCollections = client.db("sports_store").collection("sports");

        // Get all sports items
        app.get("/sports", async (req, res) => {
            const result = await sportsCollections.find().toArray();
            res.send(result);
        });

        app.get("/sports/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await sportsCollections.findOne(query)
            res.send(result)
        })


    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
run();

app.get('/', (req, res) => {
    res.send('Hello World My Friend!');
});

// Server Start
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});