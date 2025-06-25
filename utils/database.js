const mysql = require('mysql2')

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"mystore",
    port:3306,
    multipleStatements:true
});

module.exports = pool.promise();
pool.getConnection((err,connection)=>{
    if(err){
        console.log(err.sqlMessage);
    }
    else{
        pool.query("select * from products",(error,data)=>{
            if(error){
                console.log(error);
            }
            else{
                console.log(data);
            }
        })
        console.log("Connection Extablished");
    }
})