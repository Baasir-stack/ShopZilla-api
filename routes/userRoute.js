const router = require('express').Router()

const {validateTokenAndAuthorization, validateTokenAndAdmin} = require('../service/auth')

const {updateUser,
    deleteUser,
    getAllUsers,
    getUser,
    getStats,
    createUser
}  = require('../controllers.js/userController')



router.patch('/:id',validateTokenAndAuthorization,updateUser)

router.delete("/:id",validateTokenAndAuthorization,deleteUser)

router.get('/',validateTokenAndAdmin,getAllUsers)

//create user
router.post('/',validateTokenAndAdmin,createUser)

router.get('/find/:id',validateTokenAndAdmin,getUser)

router.get('/stats',validateTokenAndAdmin,getStats)

module.exports  =router