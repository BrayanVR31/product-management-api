import mongoose from "mongoose";

type ConnectionCb = () => void;
// mongodb string connection
const url = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`;

const testConnection = async (cb?: ConnectionCb) => {
  try {
    console.log(url);
    await mongoose.connect(url);
    cb && cb();
    console.log("database connection was successfully");
  } catch (error) {
    console.log("error");
    console.error(error);
  }
};

const connection = mongoose.createConnection(url);

export { testConnection, connection };
