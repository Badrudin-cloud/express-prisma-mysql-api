import { PrismaClient } from "@prisma/client";
const categoriesRouter = require('express').Router();

const prisma = new PrismaClient();


// Create a single  category
categoriesRouter.post('/', async (req, res, next) => {
    try {
        const category = req.body.category;
        const newCategory = await prisma.categories.create({
            data: category
        });
        res.json(newCategory);
    } catch (error) {
        res.json(error)
    }finally{
        await prisma.$disconnect();
    }
  
});


// Read all categories
categoriesRouter.get('/', async (req, res, next) => {
    try {
        const categories = await prisma.categories.findMany();
        res.json(categories);
    } catch (error) {
        res.json(error)
    }finally{
        await prisma.$disconnect();
    }
  
});


// Update a category
categoriesRouter.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = req.body.category;
        

        const updatedCategory = await prisma.categories.update({
                where: {
                    id: Number(id)
                },
                data: category
            });

        console.log(updatedCategory);
        
        res.json(updatedCategory);
    } catch (error) {
        res.json(error)
    }finally{
        await prisma.$disconnect();
    }
  
});


// Delete a category
categoriesRouter.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;        

        const deletedCategory = await prisma.categories.delete({
                where: {
                    id: Number(id)
                },
            }
        );

        
        res.json(deletedCategory);
    } catch (error) {
        res.json(error)
    }finally{
        await prisma.$disconnect();
    }
  
});




module.exports = categoriesRouter;
