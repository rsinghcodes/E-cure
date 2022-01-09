import express, { Application, Request, Response } from "express";
import logger from "morgan";
import http from "http";

import connect from "./database/connect";
import { MONGODB } from "./config";

const app: Application = express();
const PORT: string | number = process.env.PORT || 4000;
const server = http.createServer(app);

app.use(logger("dev"));

app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Server running successfully...");
});

server.listen(PORT, async () => {
  console.log(`🚀  Server ready at ${PORT}`);
  await connect({ db: MONGODB! });
});

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
