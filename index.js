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
    app.delete("/delete-blog/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await blogCollection.deleteOne(query);
      res.send(result);
    });
    app.put("/update-blog/:id", async (req, res) => {
      const id = req.params.id;
      const updatedDoc = req.body;
      const filter = { _id: ObjectId(id) };
      const updateDoc = { $set: updatedDoc };
      const result = await blogCollection.updateOne(filter, updateDoc);
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



//popular tags Collection-------------------------------
async function popularTagsCollections() {
  const TagsColletions = client.db("eco-notes-server").collection("popular-tags");
  try {
    app.get("/all-tags", async (req, res) => {
      const query = {};
      const cursor = TagsColletions.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/single-tag/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await TagsColletions.findOne(query);
      res.send(result);
    });
    app.get("/isAlreadyHave-tag", async (req, res) => {
      const tagName = req.query.searchText;
      const query = {tag: tagName}
      const result = await TagsColletions.findOne(query)
      res.send(result)
    });
    app.get("/search-tag", async (req, res) => {
      const searchText = req.query.t;
      const result = await TagsColletions.aggregate([
          {
            $search: {
              index: "search-text",
              text: {
                query: searchText,
                path: "tag",
                fuzzy: {},
              }
            }
          }
        ])
        console.log(result);
      res.send(result)
    });
    app.delete("/delete-tag/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await TagsColletions.deleteOne(query);
      res.send(result);
    });
    app.post("/post-tag", async (req, res) => {
      const tag = req.body;
      const result = await TagsColletions.insertOne(tag);
      res.send(result);
    });
  } catch {
    (err) => console.error("this productCollection error:", err);
  } finally {
  }
}
popularTagsCollections().catch((err) =>
  console.error("This is out of the function product error: ", err)
);

// //popular tags Collection-------------------------------
// async function TagsColorCollections() {
//   const TagColorColletions = client.db("eco-notes-server").collection("tag-colors");
//   try {
//     app.get("/tag-colors", async (req, res) => {
//       const query = {};
//       const cursor = TagColorColletions.find(query);
//       const result = await cursor.toArray();
//       res.send(result.slice(0, 8));
//     });
//     app.get("/single-tag-color/:id", async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: ObjectId(id) };
//       const result = await TagColorColletions.findOne(query);
//       res.send(result);
//     });
//     app.delete("/delete-single-tag-color/:id", async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: ObjectId(id) };
//       const result = await TagColorColletions.deleteOne(query);
//       res.send(result);
//     });
//     app.post("/post-single-tag-color", async (req, res) => {
//       const tag = req.body;
//       const result = await TagColorColletions.insertOne(tag);
//       res.send(result);
//     });
//   } catch {
//     (err) => console.error("this productCollection error:", err);
//   } finally {
//   }
// }
// TagsColorCollections().catch((err) =>
//   console.error("This is out of the function product error: ", err)
// );











app.get("/", (req, res) => {
  res.send("wellcome to eco-notes");
});
app.listen(port);
