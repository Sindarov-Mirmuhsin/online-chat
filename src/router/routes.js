const { Router } = require('express');
const router = Router();
const controller = require('../controller/category.controller.js');

router.get('/categories', controller.catageryInfo);


router.post('/login', controller.LOGIN);
router.post('/register', controller.REGISTER);
router.post('/categories', controller.categoryPost);
router.post('/subcategories', controller.subCategoryPost);
router.post('/products', controller.productsPost);


router.put('/product/:product_id', controller.productPut);
router.put('/subCategories/:sub_category_id', controller.subCategoryPut);
router.put('/categories/:category_id', controller.categoryPut);


router.delete('/categories/:category_id', controller.categoryDelete);
router.delete('/subCategories/:sub_category_id', controller.subCategoryDelete);
router.delete('/product/:product_id', controller.productDelete);


module.exports = router;
