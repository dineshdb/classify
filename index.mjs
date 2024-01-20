import { pipeline } from "@xenova/transformers";
import bodyParser from "body-parser";
import express from "express";
const port = 3000;

const classifier = await pipeline(
  "zero-shot-classification",
  "Xenova/mobilebert-uncased-mnli",
);

express()
  .use(bodyParser.json())
  .post("/oneshot-classification", async (req, res) => {
    const { labels, items } = req.body;
    const result = {};
    const start = performance.now();
    for (const item of items) {
      const response = await classifier(item.text, labels);
      result[item.id] = response.labels[0];
    }
    const end = performance.now();
    res.json({
      labels,
      runtime: end - start,
      result,
    });
  })
  .listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
