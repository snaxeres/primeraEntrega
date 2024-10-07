import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/cartsRouter.js'
const app = express();
const PORT = 8080;


//config para recibir objetos JSON.

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//Routes

app.use("/api/products", productsRouter)

app.use("/api/carts", cartsRouter)




app.listen(PORT, () => {
    console.log(`Corriendo en el puerto: ` + PORT);
    
})