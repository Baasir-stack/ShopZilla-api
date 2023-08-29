const router = require('express').Router()
const { validateTokenAndAdmin , validateTokenAndAuthorization} = require('../service/auth')


const {createProduct,
    updateProduct, 
    deleteProduct, 
    getIndividualProduct,
    getAllProducts}  = require('../controllers.js/productController')


router.get('/',getAllProducts)


router.post('/',validateTokenAndAuthorization,createProduct)

router.patch('/:id',validateTokenAndAdmin,updateProduct)

router.delete('/:id',validateTokenAndAdmin,deleteProduct)

router.get('/:id',getIndividualProduct)


module.exports  =router
