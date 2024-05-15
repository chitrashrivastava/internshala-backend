const express = require('express')
const { homepage,
    studentSignup,
    studentSignin,
    studentresetpassword,
    studentupdate,
    studentSignout,
    currentUser,
    studentSendmail,
    studentforgetlink,
    studentavatar,
    applyinternship,
    applyjob,
    internships,
    jobs,
    myapplication,
} = require('../controllers/indexController');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router()

router.get('/', isAuthenticated, homepage)

router.post('/student', isAuthenticated, currentUser)

// POST /Student/signup

router.post('/student/signup', studentSignup);


// POST /student/signin
router.post('/student/signin', studentSignin)

// GET /student/signout
router.get('/student/signout', isAuthenticated, studentSignout)

router.post('/student/send-mail', studentSendmail)

router.post('/student/forget-link/:id', studentforgetlink)

router.get('/student/reset-password', isAuthenticated, studentresetpassword)

router.post('/student/update/:id', isAuthenticated, studentupdate)

router.post('/student/avatar/:id', isAuthenticated, studentavatar)

router.get('/student/internships',internships)

router.get('/jobs',isAuthenticated,jobs)
// Apply internships 
router.post("/student/apply/internship/:internshipid",isAuthenticated,applyinternship);

// Apply Jobs
router.post("/student/apply/job/:jobid",isAuthenticated,applyjob);

router.get('/student/myapplication',isAuthenticated,myapplication)

module.exports = router;