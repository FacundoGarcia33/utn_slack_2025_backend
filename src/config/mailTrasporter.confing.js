import { enviroment } from "./enviroment.js";
import nodemailer from "nodemailer";

export const mailTrasporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: enviroment.Gmail_user,
    pass: enviroment.Gmail_password,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
