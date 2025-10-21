import dotenv from "dotenv";

dotenv.config();

//diccionarios de entorno para la app
export const enviroment = {
  Gmail_password: process.env.Gmail_password,
  Gmail_user: process.env.Gmail_user,
  PORT: process.env.PORT,
  Mongo_db_conection: process.env.Mongo_db_conccion_string,
  // DB_Host: process.env.DB_Host,
  // DB_Name: process.env.DB_Name,
};
