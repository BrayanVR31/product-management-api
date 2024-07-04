import "dotenv/config";
import { listen as appListen } from "./app";
import { testConnection as connectDB, testConnection } from "./config";

const main = async () => {
  try {
    await testConnection();
    appListen();
  } catch (error) {
    console.error(error);
  }
};

main();
