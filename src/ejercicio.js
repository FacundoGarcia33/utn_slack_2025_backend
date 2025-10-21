//el req es el objeto con la informacion de la peticion
//el res es el objeto con la informacion de la respuesta
//el post se ocupa para enviar informacion
app.post("/suma", (req, res) => {
  try {
    const { Numero_1, Numero_2 } = req.body;

    // Validar que los valores existan y sean numéricos
    if (!isNaN(Numero_1) && !isNaN(Numero_2)) {
      const resultado = Number(Numero_1) + Number(Numero_2);

      console.log("Body recibido:", req.body);
      console.log("Resultado:", resultado);

      res.send({ total: resultado });
    } else {
      res
        .status(400)
        .send({ error: "Parámetros incorrectos, deben ser números" });
    }
  } catch (error) {
    console.log("[SERVER ERROR]: no se pudo sumar " + error.message);
    res.status(500).send({ error: "Error interno del servidor" });
  }
});

// Crear un endpoint en /products
// Cuando se envie un post se debera capturar el title, price, stock del producto y debera crearse un objeto que se agregue a lista de products, muy importante validar que title sea un string de almenos 4 caracteres, price sea un numero positivo y tambien el stock.
// Recuerden crear un id para el producto.

let contadorId = 1;
const productos = [];

app.post("/products", (req, res) => {
  //Lo usamos para poder usar el body de la peticion
  console.log("Body recibido:", req.body);

  const { title, price, stock } = req.body;

  if (title && title.length > 4 && price > 0 && stock > 0) {
    const newProduct = {
      id: contadorId++,
      title,
      price,
      stock,
    };
    productos.push(newProduct);
    res.send({ message: "Producto creado exitosamente", producto: newProduct });
  } else {
    res.status(400).send({ message: "Producto no creado. Datos inválidos" });
  }
});
