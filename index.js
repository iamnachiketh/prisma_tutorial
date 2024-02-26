const express = require('express');
const app = express();
require('dotenv').config();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

app.use(express.json());

app.get(("/"),async (req,res)=>{
   const allUsers = await prisma.user.findMany();
   res.json(allUsers);
})

app.post("/",async (req,res)=>{
    const newUser = await prisma.user.create({data:req.body});
    res.json(newUser);
})

app.put("/:id",async (req,res)=>{
    const id = req.params.id;
    const newAge = req.body.age;
    const updateUser = await prisma.user.update({
        where:{id:parseInt(id)},
        data:{age:newAge}
    });
    res.json(updateUser);
})

app.delete("/:id",async (req,res)=>{
    const id = req.params.id;
    const deleteUser = await prisma.user.delete({where:{id:parseInt(id)}});
    res.json(deleteUser);
})

app.listen(3000,()=>console.log(3000));
