import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import routes from "./routes";

const app = express();

const PORT = process.env.APP_PORT;

app.use(express.json());

routes(app);

app.listen(PORT, () => {
  console.log(
    `\n[Express] Server running on port ${PORT}`,
    `\n[Express] Access to http://localhost:${PORT}.`
  );
});
