const express = require('express')
const { homepage,
    employeeSignup,
    employeeSignin,
    employeeresetpassword,
    employeeupdate,
    employeeSignout,
    currentUser,
    employeeSendmail,
    employeeforgetlink,
    employeeavatar,
    createinternship,
    readinternship,
    readsingleinternship,
    createjob,
    readjob,
    readsinglejob
} = require('../controllers/employeeController');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router()


router.post('/', isAuthenticated, currentUser)

// // POST /employee/signup

router.post('/signup', employeeSignup);


// // POST /employee/signin
router.post('/signin', employeeSignin)

// // GET /employee/signout
router.get('/signout', isAuthenticated, employeeSignout)

router.post('/send-mail', employeeSendmail)

router.post('/forget-link/:id', employeeforgetlink)

router.get('/reset-password', isAuthenticated, employeeresetpassword)

router.post('/update/:id', isAuthenticated, employeeupdate)

router.post('/avatar/:id', isAuthenticated, employeeavatar)

// Internships ------------------------------------------

router.post('/internship/create',isAuthenticated,createinternship)

// Jobs
router.post('/job/create',isAuthenticated,createjob)


router.post('/internship/read',isAuthenticated,readinternship)

router.post('/job/read',isAuthenticated,readjob)

router.post('/job/read/:id',isAuthenticated,readsinglejob)



router.post('/internship/read/:id',isAuthenticated,readsingleinternship)




module.exports = router