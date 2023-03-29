import config from "./config";
import mongoose from "mongoose";
import app from "./app";

async function setUpApplication() {
  try {
    await mongoose.connect(config.MONGO_URI);
    app.listen(config.PORT, () => {
      console.log("App is running on port ", config.PORT);
    });
  } catch (error) {
    console.log(error);
  }
}

setUpApplication();