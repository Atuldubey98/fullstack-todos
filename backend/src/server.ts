import mongoose from "mongoose";
import app from "./app";
import config from "./config";

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
