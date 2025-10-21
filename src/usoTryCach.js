import fileSystem from "fs";
import { Saludo } from "./saludo.js";
import { math } from "./math.js";
const Texto = fileSystem.writeFileSync(
  "./src/texto.txt",
  "Soy facundo tengo 20 años y soy programador Full stack",
  { encoding: "utf-8" }
);

const saludo = fileSystem.writeFileSync("./src/saludo.txt", Saludo(), {
  encoding: "utf-8",
});

try {
  //try catch lo que hace es ejecutar el coidog
  console.log(math(10, 5));
} catch (error) {
  //el cache lo que hace es capturar el error
  console.log(error.message);
} finally {
  //devuelve el final de la ejecuccion asi este bien o mal
  console.log("Termino la ejecuccion");
}
