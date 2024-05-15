const express = require('express')
const { isAuthenticated } = require('../middlewares/auth');
const { resume, addeducation, editeducation, addskill, deleteducation, addjobs, deleteresponsibility, editJob, deletejob, addinternships, editInternship, deleteinternship, addresponsibility, editResponsibility, deleteskill, addprojects, editproject, deletproject, addachievement, deleteachievement } = require('../controllers/resumeConteroller')
const router = express.Router()

router.get('/', isAuthenticated, resume)


router.post('/add-education', isAuthenticated, addeducation)

router.post('/add-jobs', isAuthenticated, addjobs)

router.post('/add-responsibility', isAuthenticated, addresponsibility)

router.post('/add-achievement', isAuthenticated, addachievement)


router.post('/add-skills', isAuthenticated, addskill)

router.post('/add-projects', isAuthenticated, addprojects)

router.post('/edit-education/:eduid', isAuthenticated, editeducation)

router.post('/edit-job/:eduid', isAuthenticated, editJob);

router.post('/edit-responsibility/:index', isAuthenticated, editResponsibility);

router.post('/edit-project/:eduid', isAuthenticated, editproject);

router.post('/delete-responsibility/:index', isAuthenticated, deleteresponsibility);

router.post('/delete-achievement/:index', isAuthenticated, deleteachievement);

router.post('/delete-skill/:index', isAuthenticated, deleteskill);

router.post('/delete-education/:eduid', isAuthenticated, deleteducation)

router.post('/delete-project/:eduid', isAuthenticated, deletproject)

router.post('/delete-responsibility/:index', isAuthenticated, deleteresponsibility)

router.post('/delete-job/:eduid', isAuthenticated, deletejob)

router.post('/add-internships', isAuthenticated, addinternships)

router.post('/edit-internship/:eduid', isAuthenticated, editInternship);

router.post('/delete-internship/:eduid', isAuthenticated, deleteinternship)

module.exports = router