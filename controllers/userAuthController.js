
const Users = require("../models/users")

exports.renderSignUp = (req, res) => {
    const cookie = req.get("Cookie");
    let isLoggedIn = false;
    
    if (cookie) {
        const cookieArray = cookie.split(";");
        cookieArray.forEach(c => {
            const [key, value] = c.trim().split("=");
            if (key === "isLoggedIn" && value === "true") {
                isLoggedIn = true;
            }
        });
    }
    
    res.render('sign-up', {
        isLoggedIn: isLoggedIn
    });
}

exports.registerUser = (req, res) => {
    const {userName, password, confirmPassword} = req.body;

    const users = new Users(null, userName, password);

    users.insertUser()
        .then(() => {
            res.redirect('/');
        })
}

exports.renderLogin = (req, res) => {
    const cookie = req.get("Cookie");
    let isLoggedIn = false;
    
    if (cookie) {
        const cookieArray = cookie.split(";");
        cookieArray.forEach(c => {
            const [key, value] = c.trim().split("=");
            if (key === "isLoggedIn" && value === "true") {
                isLoggedIn = true;
            }
        });
    }
    
    res.render('login', {
        isLoggedIn: isLoggedIn
    });
}

exports.validateLogin = (req, res) => {
    const {userName, password} = req.body;

    Users.fetchUserByUsername(userName)
        .then(([[userCredentials], tInfo]) => {
            if(userCredentials){
                if(userCredentials.password === password){
                    res.cookie("isLoggedIn", "true")
                    res.redirect('/');
                }else{ 
                    res.cookie("isLoggedIn", "invalidPassword");
                    res.redirect('/login');  
                }
            }else{
                res.cookie("isLoggedIn", "inValidUsername");
                res.redirect('/login')
            }
        })
}

exports.logout = (req, res) => {
    res.cookie("isLoggedIn", "false")
    res.redirect('/');
}
