const express = require('express');
const app = express();
const home = require('./routes/home')  
const addProduct = require('./routes/addProduct')  
const editProduct = require('./routes/editProduct');  
const deleteProductRoutes = require('./routes/deleteProduct'); 
const userAuth = require('./routes/userAuth');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'))

app.set('view engine','ejs');
app.set('views','views')


app.use('/',home)
app.use('/addProduct',addProduct)
app.use('/editProduct',editProduct)
app.use('/deleteProduct',deleteProductRoutes)
app.use('/',userAuth)
 
const server = app.listen(3000, ()=>{
     console.log("Server Running...");
})