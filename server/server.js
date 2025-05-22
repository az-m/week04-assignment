import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.listen(8080, function () {
  console.log("Server is alive and listening on 8080");
});

app.get("/", function (request, response) {
  response.json({ message: "This is the root route of the API." });
});

const db = new pg.Pool({
  connectionString: process.env.DB_URL,
});

app.get("/messages", async (request, response) => {
  const query = await db.query(`SELECT * FROM messages`);
  response.json(query.rows);
});

app.post("/addMessage", (request, response) => {
  const body = request.body;
  const query = db.query(
    `INSERT INTO messages (name, location, content) VALUES($1,$2,$3)`,
    [body.name, body.location, body.content]
  );
  response.json(query);
});
