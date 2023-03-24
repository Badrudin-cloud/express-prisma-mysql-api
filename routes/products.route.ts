import { PrismaClient } from "@prisma/client";
const productsRouter = require('express').Router();

const prisma = new PrismaClient();


// Create a single  product
productsRouter.post('/', async (req, res, next) => {
    try {
        const product = req.body.product;
        const newProduct = await prisma.products.create({
            data: product
        });
        res.json(newProduct);
    } catch (error) {
        res.json(error)
    }finally{
        await prisma.$disconnect();
    }
  
});


// Read all products
productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await prisma.products.findMany();
        res.json(products);
    } catch (error) {
        res.json(error)
    }finally{
        await prisma.$disconnect();
    }
  
});


// Update a product
productsRouter.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = req.body.product;
        

        const updatedProduct = await prisma.products.update({
                where: {
                    id: Number(id)
                },
                data: product
            });

        console.log(updatedProduct);
        
        res.json(updatedProduct);
    } catch (error) {
        res.json(error)
    }finally{
        await prisma.$disconnect();
    }
  
});


// Delete a product
productsRouter.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;        

        const deletedProduct = await prisma.products.delete({
                where: {
                    id: Number(id)
                },
            }
        );

        
        res.json(deletedProduct);
    } catch (error) {
        res.json(error)
    }finally{
        await prisma.$disconnect();
    }
  
});




module.exports = productsRouter;
