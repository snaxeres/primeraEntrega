import fs from 'fs/promises';
import path from 'path';

const productFilePath = path.resolve('data', 'productos.json')

export default class ProductManager {
    constructor() {
        this.products = []
        this.init()
    }



    async init() {
        try {
            const data = await fs.readFile(productFilePath, 'utf-8')
            this.products = JSON.parse(data)
        } catch (error) {
            this.products = []
        }
    }

    saveToFile() {
        fs.writeFile(productFilePath, JSON.stringify(this.products, null, 2))
    }

    getAllProducts(limit) {
        if (limit) {
            return this.products.slice(0, limit);
        }
        return this.products;
    }

    getProductsById(id) {
        return this.products.find(product => product.id === id)
    }

    addProduct(product) {
        const newProduct = {
            id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
            ...product,
            status: true,
        }

        this.products.push(newProduct);
        this.saveToFile();
        return newProduct;
    }

    //actualizacion de cualquier campo
    updateProduct(id, updateFields) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) return null;

        const updateProduct = {
            ...this.products[productIndex],
            ...updateFields,
            id: this.products[productIndex].id
        }


        this.products[productIndex] = updateProduct;
        this.saveToFile();
        return updateProduct;

    }

    deletedProduct(id){
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) return null;
        const deletedProduct = this.products.splice(productIndex, 1);
        this.saveToFile();
        return deletedProduct(0)
    }
}