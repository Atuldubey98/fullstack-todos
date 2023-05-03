import os from "os";
import cluster from "cluster";
import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import http from "http";
if (cluster.isPrimary) {
  const nofCpus: number = os.cpus().length;
  for (let i = 0; i < nofCpus; i++) {
    cluster.fork();
  }
} else {
  async function setUpApplication() {
    try {
      await mongoose.connect(config.MONGO_URI);
      const server = http.createServer(app);
      server.listen(config.PORT, () => {
        console.log(
          `App is listening on port ${config.PORT} for pid ${process.pid}`
        );
      });
    } catch (error) {
      console.log(error);
    }
  }
  setUpApplication();
}
