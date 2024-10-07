import { Router } from 'express';
import CartManager from '../services/cartManager.js';
// PROBANDO
import ProductManager from '../services/productManager.js';

const routerCart = Router()

// Creamos la instancia de la clase del cartmanager
const cartManager = new CartManager()

// Creamos la instancia de la clase del productomanager
const productManager = new ProductManager();

//POST

routerCart.post('/', async (req, res) => {
    try {

        const { id, products } = req.body;

        if (!id || !products) {
            return res.status(404).json({ error: 'Todos los campos son obligatorios' })
        }

        const cart = await cartManager.addCart({ id, products })

        res.status(201).json(cart)


    } catch (error) {
        console.log(error);

    }

})


//GET :cid

routerCart.get('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.pid);
        await cartManager.init();
        await productManager.init();

        const cart = await cartManager.getCartsById(cartId)

        const products = productManager.products.map(i => ({
            productId: i.id,
            quantity: i.quantity
        }))

        const response = {
            cart,
            products
        }

        res.json(response);


        // este metodo tambien sirve pero me trae el producto completo        
        // const products = productManager.products;
        // const response = {
        //     cart,
        //     products
        // };
        // res.json(response)
    } catch (error) {
        console.log(error);

    }

})




//Post:pid

routerCart.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.pid);

        const updateCart = await cartManager.updateCart(cartId, req.body)

        if (updateCart) {
            res.json(updateCart)
        } else {
            res.status(404).json({ eror: 'Carrito no encontrado' })
        }


    } catch (error) {
        console.log(error);

    }

})



export default routerCart;