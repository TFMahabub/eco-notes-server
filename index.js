const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//middleware
app.use(cors());
app.use(express.json());

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

//Blog Collection-------------------------------
async function porductCollection() {
  const blogCollection = client.db("eco-notes-server").collection("blogs");
  try {
    app.get("/blogs", async (req, res) => {
      const query = {};
      const cursor = blogCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/single-blog/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await blogCollection.findOne(query);
      res.send(result);
    });
    app.post("/add-blog", async (req, res) => {
      const product = req.body;
      const result = await blogCollection.insertOne(product);
      res.send(result);
    });
    app.get("/add_products", async (req, res) => {
      const query = {};
      const cursor = blogCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
  } catch {
    (err) => console.error("this productCollection error:", err);
  } finally {
  }
}
porductCollection().catch((err) =>
  console.error("This is out of the function product error: ", err)
);

//User Collection--------------------------------
async function userCollection() {
  const UserCollection = client.db("eco-notes-server").collection("user");
  try {
    app.post("/user", async (req, res) => {
      const user = req.body;
      const result = await UserCollection.insertOne(user);
      res.send(result);
    });
    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await UserCollection.deleteOne(query);
      res.send(result);
    });
    app.put("/user/:id", async (req, res) => {
      const id = req.params.id;
      const updatedDoc = req.body;
      const filter = { _id: ObjectId(id) };
      const updateDoc = { $set: updatedDoc };
      const result = await UserCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    app.get("/user", async (req, res) => {
      const query = {};
      const cursor = UserCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
  } catch {
    (err) => console.error("this user error:", err);
  } finally {
  }
}
userCollection().catch((err) =>
  console.error("This is out of the function user error: ", err)
);

app.get("/", (req, res) => {
  res.send("wellcome to eco-notes");
});
app.listen(port);
