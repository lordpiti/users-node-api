const User = require('../models/user');
const userService = require('../services/user-service')

exports.postAddUser = (req, res, next) => {
  console.log(req.body);
  const email = req.body.email;
  const userId = req.body.userId;
  const authenticationType = req.body.authenticationType;
  const token = req.body.token;
  const name = req.body.name;
  const role = req.body.role;
  const user = new User({
    Email: email,
    UserId: userId,
    Name: name,
    Role: role,
    Token: token,
    AuthenticationType: authenticationType
  });
  user
    .save()
    .then(result => {
      console.log(result);
      console.log('Created User');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.loginGoogle = async (req, res, next) => {
  const userId = req.body.userId;
  const accessToken = req.body.accessToken;

  await userService.loginUser(userId, accessToken, 2, (doc) => {
    //console.log(doc);
    res.send(doc);
  });
};

exports.loginFacebook = async (req, res, next) => {
  const userId = req.body.userId;
  const accessToken = req.body.accessToken;

  await userService.loginUser(userId, accessToken, 1, (doc) => {
    //console.log(doc);
    res.send(doc);
  });
};

exports.checkAccess = (req, res, next) => {
  
  userService.checkAccess(req.headers["access-token"], '2', (doc) => {
    if (doc) {
      next();
    }
  });

  // if (req.headers["access-token"] === 'haha'){
  //   next();
  // }
};

exports.getAllUsers = (req, res, next) => {
  userService.findAllUsers((users) => {
    res.send(users);
  })
};

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect('/');
//   }
//   const prodId = req.params.productId;
//   Product.findById(prodId)
//     // Product.findById(prodId)
//     .then(product => {
//       if (!product) {
//         return res.redirect('/');
//       }
//       res.render('admin/edit-product', {
//         pageTitle: 'Edit Product',
//         path: '/admin/edit-product',
//         editing: editMode,
//         product: product
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedPrice = req.body.price;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedDesc = req.body.description;

//   const product = new Product(
//     updatedTitle,
//     updatedPrice,
//     updatedDesc,
//     updatedImageUrl,
//     prodId
//   );
//   product
//     .save()
//     .then(result => {
//       console.log('UPDATED PRODUCT!');
//       res.redirect('/admin/products');
//     })
//     .catch(err => console.log(err));
// };

// exports.getProducts = (req, res, next) => {
//   Product.fetchAll()
//     .then(products => {
//       res.render('admin/products', {
//         prods: products,
//         pageTitle: 'Admin Products',
//         path: '/admin/products'
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.deleteById(prodId)
//     .then(() => {
//       console.log('DESTROYED PRODUCT');
//       res.redirect('/admin/products');
//     })
//     .catch(err => console.log(err));
// };
