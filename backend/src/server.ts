import cluster from "cluster";
import http from "http";
import os from "os";
import app from "./app";
import config from "./config";
if (cluster.isPrimary) {
  const nofCpus: number = os.cpus().length;
  for (let i = 0; i < nofCpus; i++) {
    cluster.fork();
  }
} else {
  setUpApplication();
}
export async function setUpApplication() {
  try {
    const server = http.createServer(app);
    server.listen(config.PORT, () => {
      console.log(
        `App is listening on port ${config.PORT} for pid ${process.pid}`
      );
    });
  } catch (error) {
    throw error;
  }
}
