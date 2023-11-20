const express = require("express");
const { MongoClient } = require("mongodb");
const { getDB } = require("../database");

const router = express.Router();

//displaying the todos

router.get("/", async (req, res) => {
  try {
    const db = getDB();
    //   console.log(db)

    const todosCollection = db.collection("todos-list");

    const todos = await todosCollection.find({}).toArray();

    res.json({
      todos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//updating the todos

router.put("/", async (req, res) => {
  try {
    const db = getDB();

    const todosCollection = db.collection("todos-list");

    const updatedtodosData = req.body;

    await todosCollection.deleteMany({});

    const result = await todosCollection.insertMany(updatedtodosData);

    if (result.acknowledged) {
      res.json({ message: "todos updated successfully" });
    } else {
      res.status(404).json({ error: "todos have not updated, Check API" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//adding new todo
router.post("/", async (req, res) => {
  try {
    const db = getDB();

    const newtodo = req.body;

    const todosCollection = db.collection("todos-list");

    const result = await todosCollection.insertOne(newtodo);

    if (result.acknowledged) {
      res.json({ message: newtodo });
    } else {
      res.status(404).json({ error: "falied to add todo" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//deleting the todo

router.delete("/:name", async (req, res) => {
  try {
    const db = getDB();

    const deleteName = req.params.name;

    const todosCollection = db.collection("todos-list");

    const result = await todosCollection.deleteOne({name:deleteName});

    if(result.deletedCount > 0)  {
        res.json({message:`Deleted ${deleteName} item`})
    } else{
        res.status(404).json({error:`Couldnt delete ${deleteName}`})
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
