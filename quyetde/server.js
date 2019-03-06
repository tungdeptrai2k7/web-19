const express = require("express");
const server = express();
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const questionModel = require('./model');
mongoose.connect("mongodb://localhost:27017/quyetde", err => {
  if (err) {
    throw err;
  }
  console.log("Connect to Mongodb success");

  server.use(express.static(__dirname + "/public"));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.get("/", (req, res) => {
    fs.readFile("./data.json", (err, data) => {
      if (err) {
        res.status(500).send("Internal server error");
      }
      const questions = JSON.parse(data);
      const randomIndex = Math.floor(Math.random() * questions.length);
      const randomQuestion = questions[randomIndex];

      res.status(200).sendFile(path.resolve(__dirname, "./public/index.html"));
    });
  });
  server.get("/create-question", (rep, res) => {
    res
      .status(200)
      .sendFile(path.resolve(__dirname, "./public/create-question.html"));
  });
  server.post("/create-question", async (req, res) => {
   const newQuestion = {
    content: req.body.content,
   }; 
   const result =await questionModel.create(newQuestion);
   console.log(result);
   res.status(201).json({
    id: result._id,
   });
  });
  server.get("/vote/:questionID/:vote", async (req, res) => {
    const { questionID, vote } = req.params;
    console.log(questionID, vote);

    fs.readFile("./data.json", (err, data) => {
      if (err) {
        res.status(500).send("Internal server error");
      }
      const questions = JSON.parse(data);
      for (let item of questions) {
        if (item.id == questionID) {
          vote === "yes" ? (item.yes += 1) : (item.no += 1);
          break;
        }
      }

      fs.writeFile("./data.json", JSON.stringify(questions), err => {
        if (err) {
          res.status(500).send("Internal server error");
        }
        res.status(200).send("Update question success");
      });
    });
  });
  server.get("/result/:questionId", (req, res) => {
    res
      .status(200)
      .sendFile(path.resolve(__dirname, "./public/vote-result.html"));
  });
  server.get("/get-question-by-id", (req, res) => {
    console.log(req.query);
    const questionId = req.query.questionId;
    fs.readFile("./data.json", (err, data) => {
      if (err) {
        res.status(500).send("Internal server error");
      }
      const questions = JSON.parse(data);
      let selectQuestions;
      for (let item of questions) {
        if (item.id == Number(questionId)) {
          selectQuestions = item;
          break;
        }
      }
      if (selectQuestions) {
        res.status(200).json(selectQuestions);
      } else {
        res.status(200).json({ message: "Question not found" });
      }
    });
  });
  server.get("/random-question", (req, res) => {
    fs.readFile("./data.json", (err, data) => {
      if (err) {
        res.status(500).send("Internal server error");
      }
      const questions = JSON.parse(data);
      const randomIndex = Math.floor(Math.random() * questions.length);
      const randomQuestion = questions[randomIndex];

      res.status(200).json(randomQuestion);
    });
  });
  server.listen(3000, err => {
    if (err) {
      throw err;
    }
    console.log("Server listen on port 3000...");
  });
});
