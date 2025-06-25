
const Products = require("../models/products")

exports.renderProducts = (req, res) => {
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

  Products.fetchProducts()
    .then(([rows, fieldData]) => {
      res.render("home", {
        products: rows,
        isLoggedIn: isLoggedIn
      });
    });
}

exports.renderAddProduct = (req, res) => {
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
  
  res.render("addProduct", {
    isLoggedIn: isLoggedIn
  });
}

exports.postAddProduct = (req, res) => {
  const { product_name, price, image } = req.body;
  const products = new Products(null, product_name, price, image);
  
  products.postData()
    .then(() => {
      res.redirect('/');
    });
}

exports.renderEditProduct = (req, res) => {
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
  
  Products.fetchProductsById(req.params.id)
    .then(([[productData], fieldData]) => {
      res.render("editProduct", {
        product: productData,
        isLoggedIn: isLoggedIn
      });
    });
}

exports.editProduct = (req, res) => {
  const { product_name, price, image } = req.body;
  const id = req.params.id;

  const products = new Products(id, product_name, price, image);

  products.editData().then(() => {
    res.redirect('/');
  });
}

exports.deleteProduct = (req, res) => {
  Products.deleteProductsById(req.params.id)
    .then(() => {
      res.redirect('/');
    });
}
