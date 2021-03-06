const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
//router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
// router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/LoginGoogle', adminController.loginGoogle);

router.post('/Login', adminController.loginFacebook);

router.get(
  '/UserList',
  adminController.checkAccess,
  adminController.getAllUsers
);

router.post('/CreateTopSquad', adminController.postCreateTopSquad);

router.get('/TopSquadList', adminController.getAllTopSquads);

// router.get('/edit-product/:productId', adminController.getEditProduct);

// router.post('/edit-product', adminController.postEditProduct);

// router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
