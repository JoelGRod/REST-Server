import mongoose from "mongoose";

const dbConnection = async (): Promise<void> => {
  const url = String(process.env.DB_CNN);
  try {
    await mongoose.connect(url);
    console.log("DB Online");
  } catch (error) {
    console.log("Db Connection Error: ", error);
  }
};

export default dbConnection;
