const pool = require("../utils/database")

module.exports = class Users{
    constructor(id,userName,password){
        this.id = id;
        this.userName = userName;
        this.password = password;
    }

    insertUser(){
        return pool.execute(
            "insert into users(userName,password) values(?,?)",
            [this.userName,this.password]
        );
    }

    static fetchUserByUsername(userName){
        return pool.execute(
            "select * from users where userName=?",
            [userName]
        );
    }
}

