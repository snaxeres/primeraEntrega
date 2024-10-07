import fs from 'fs/promises';
import path from 'path';
import ProductManager from './productManager.js';

const cartFilePath = path.resolve('data', 'carts.json')

export default class CartManager {
    constructor() {
        this.carts = []
        this.productManager = new ProductManager();
        this.init()
    }



    async init() {
        try {
            await this.productManager.init();
            const data = await fs.readFile(cartFilePath, 'utf-8')
            this.carts = JSON.parse(data)
            
        } catch (error) {
            this.carts = []
        }
    }

    saveToFile() {
        fs.writeFile(cartFilePath, JSON.stringify(this.carts, null, 2))
    }


    getCartsById(id) {
        return this.carts.find(cart => cart.id === id)
    }

    addCart(cart) {
        const newCart = {
            id: this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1,
            ...cart,
            status: true,
        }

        this.carts.push(newCart);
        this.saveToFile();
        return newCart;
    }

    //actualizacion de cualquier campo
    updateCart(id, updateFields) {
        const cartIndex = this.carts.findIndex(cart => cart.id === id);
        if (cartIndex === -1) return null;

        const updateCart = {
            ...this.carts[cartIndex],
            ...updateFields,
            id: this.carts[cartIndex].id
        }


        this.carts[cartIndex] = updateCart;
        this.saveToFile();
        return updateCart;

    }

    deletedCart(id){
        const cartIndex = this.carts.findIndex(cart => cart.id === id);
        if (cartIndex === -1) return null;
        const deletedCart = this.carts.splice(cartIndex, 1);
        this.saveToFile();
        return deletedCart(0)
    }
}