const pool = require("../utils/database")

module.exports = class Products{
    constructor(id,product_name,price,image){
        this.id = id;
        this.product_name = product_name;
        this.price = price;
        this.image = image;
    }

    static fetchProducts(){
        return pool.execute("select * from products")
    }
    static fetchProductsById(id){
        return pool.execute("select * from products where id=?", [id])
    }
    static deleteProductsById(id){
        return pool.execute("delete from products where id=?", [id])
    }

    

    postData(){
        
        return pool.execute(
            "insert into products (product_name,price,image) values(?,?,?)", 
        [this.product_name,this.price,this.image]);
    }
    editData(){
        return pool.execute("update products set product_name=?, price=?, image=? where id=?",
            [this.product_name,this.price,this.image,this.id]
        );
    }
}