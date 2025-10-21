import { conecttoMongoDB } from "./config/config.js";
import express from "express";
import { authRouter } from "./router/auth.reouter.js";
import { workspaceRouter } from "./router/workspace.router.js";
import handlebars from "express-handlebars";
import { UserRepository } from "./repositoris/usuerRepository.js";
import { enviroment } from "./config/enviroment.js";
import { mailTrasporter } from "./config/mailTrasporter.confing.js";
import cors from "cors";

conecttoMongoDB();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const Port = 8080;

app.use("/api/auth", authRouter);
app.use("/api/workspaces", workspaceRouter);

//mandar mail
// mailTrasporter.sendMail({
//   from: enviroment.Gmail_user, //desde donde enviar
//   to: "facundogar033@gmail.com", //donde se va a dirigir
//   subject: "Prueba de envio de correo", //asunto
//   html: "<h1>Hola Ariel, queriamos avisale que su hijo es un capo maestro </h1>", //mensaje del mail
// });
app.listen(enviroment.PORT || Port, () => {
  console.log(`Servidor corriendo en el puerto ${enviroment.PORT}`);
});
