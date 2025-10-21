import mongoose from "mongoose";
import { enviroment } from "./enviroment.js";
//async lo convierte en una promesa
export async function conecttoMongoDB() {
  try {
    const conection_string = enviroment.Mongo_db_conection;
    //await hara que se espere a que se ejecute la promesa
    await mongoose.connect(conection_string);
    console.log("Conexxion exitosa");
  } catch (error) {
    console.error(error);
  }
}
