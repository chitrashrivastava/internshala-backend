const { catchAsyncErrors } = require('../middlewares/catchAsyncError')
const Student = require('../models/studentModel');
const ErrorHandler = require('../utils/ErrorHandler');
const { v4: uuidv4 } = require('uuid')

exports.resume = catchAsyncErrors(async (req, res, next) => {
    const { resume } = await Student.findById(req.id).exec()
    res.json({ message: "Secure resume page!", resume })
})


exports.addeducation = catchAsyncErrors(async (req, res, next) => {
    try {
        console.log(req.body); // Log the request body

        const student = await Student.findById(req.id).exec();

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        if (!student.resume) {
            student.resume = {
                education: [],
                jobs: [],
                internships: [],
                responsibility: [],
                courses: [],
                projects: [],
                skills: [],
                achievements: []
            };
        }

        student.resume.education.push({ ...req.body, id: uuidv4() });

        await student.save();

        console.log(student); // Check the updated student object in the console

        res.json({ message: "Education Added" });
    } catch (error) {
        console.error("Error in addeducation route:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

exports.addjobs = catchAsyncErrors(async (req, res, next) => {
    try {
        console.log(req.body); // Log the request body

        const student = await Student.findById(req.id).exec();

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        if (!student.resume) {
            student.resume = {
                education: [],
                jobs: [],
                internships: [],
                responsibility: [],
                courses: [],
                projects: [],
                skills: [],
                achievements: []
            };
        }

        student.resume.jobs.push({ ...req.body, id: uuidv4() });

        await student.save();

        console.log(student); // Check the updated student object in the console

        res.json({ message: "Job Added" });
    } catch (error) {
        console.error("Error in addjob route:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

exports.addinternships = catchAsyncErrors(async (req, res, next) => {
    try {
        console.log(req.body); // Log the request body

        const student = await Student.findById(req.id).exec();

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        if (!student.resume) {
            student.resume = {
                education: [],
                jobs: [],
                internships: [],
                responsibility: [],
                courses: [],
                projects: [],
                skills: [],
                achievements: []
            };
        }

        student.resume.internships.push({ ...req.body, id: uuidv4() });

        await student.save();

        console.log(student); // Check the updated student object in the console

        res.json({ message: "Job Added" });
    } catch (error) {
        console.error("Error in addjob route:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

exports.addprojects = catchAsyncErrors(async (req, res, next) => {
    try {
        console.log(req.body); // Log the request body

        const student = await Student.findById(req.id).exec();

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        if (!student.resume) {
            student.resume = {
                education: [],
                jobs: [],
                internships: [],
                responsibility: [],
                courses: [],
                projects: [],
                skills: [],
                achievements: []
            };
        }

        student.resume.projects.push({ ...req.body, id: uuidv4() });

        await student.save();

        console.log(student); // Check the updated student object in the console

        res.json({ message: "Job Added" });
    } catch (error) {
        console.error("Error in addjob route:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

exports.addresponsibility = catchAsyncErrors(async (req, res, next) => {
    try {
      console.log(req.body); // Log the request body
  
      const student = await Student.findById(req.id).exec();
  
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      if (!student.resume) {
        student.resume = {
          education: [],
          jobs: [],
          internships: [],
          responsibility: [],
          courses: [],
          projects: [],
          skills: [],
          achievements: []
        };
      }
        const newResponsibility = req.body.responsibility;
  
      student.resume.responsibility.push(newResponsibility);
  
      await student.save();
  
      console.log(student); // Check the updated student object in the console
  
      res.json({ message: "Responsibility Added" });
    } catch (error) {
      console.error("Error in addresponsibility route:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  exports.addachievement = catchAsyncErrors(async (req, res, next) => {
    try {
      console.log(req.body); // Log the request body
  
      const student = await Student.findById(req.id).exec();
  
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      if (!student.resume) {
        student.resume = {
          education: [],
          jobs: [],
          internships: [],
          responsibility: [],
          courses: [],
          projects: [],
          skills: [],
          achievements: []
        };
      }
        const newAchievement = req.body.achievements;
  
      student.resume.achievements.push(newAchievement);
  
      await student.save();
  
      console.log(student); // Check the updated student object in the console
  
      res.json({ message: "Achievement Added" });
    } catch (error) {
      console.error("Error in addachievement route:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  exports.addskill = catchAsyncErrors(async (req, res, next) => {
    try {
      console.log(req.body); // Log the request body
  
      const student = await Student.findById(req.id).exec();
  
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      if (!student.resume) {
        student.resume = {
          education: [],
          jobs: [],
          internships: [],
          responsibility: [],
          courses: [],
          projects: [],
          skills: [],
          achievements: []
        };
      }
        const newSkill = req.body.skill;
  
      student.resume.skills.push(newSkill);
  
      await student.save();
  
      console.log(student); // Check the updated student object in the console
  
      res.json({ message: "Skill Added" });
    } catch (error) {
      console.error("Error in addskill route:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
  


exports.editeducation=catchAsyncErrors(async(req,res,next)=>{
    const student  = await Student.findById(req.id).exec()
    const eduIndex=student.resume.education.findIndex((i)=>i.id===req.params.eduid)
    student.resume.education[eduIndex]={ ...student.resume.education[eduIndex],...req.body}
    await student.save()
    res.json({ message: "Education Updated" })
})

exports.editproject=catchAsyncErrors(async(req,res,next)=>{
    const student  = await Student.findById(req.id).exec()
    const projectIndex=student.resume.projects.findIndex((i)=>i.id===req.params.eduid)
    student.resume.projects[projectIndex]={ ...student.resume.projects[projectIndex],...req.body}
    await student.save()
    res.json({ message: "Project Updated" })
})
exports.editJob=catchAsyncErrors(async(req,res,next)=>{
    const student  = await Student.findById(req.id).exec()
    const jobIndex=student.resume.jobs.findIndex((i)=>i.id===req.params.eduid)
    student.resume.jobs[jobIndex]={ ...student.resume.jobs[jobIndex],...req.body}
    await student.save()
    res.json({ message: "Job Updated" })
})
exports.editInternship=catchAsyncErrors(async(req,res,next)=>{
    const student  = await Student.findById(req.id).exec()
    const internshipIndex=student.resume.internships.findIndex((i)=>i.id===req.params.eduid)
    student.resume.internships[internshipIndex]={ ...student.resume.internships[internshipIndex],...req.body}
    await student.save()
    res.json({ message: "Internship Updated" })
})
// backend/controllers/resumeController.js
exports.editResponsibility = catchAsyncErrors(async (req, res, next) => {
    try {
        const student = await Student.findById(req.id).exec();

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Find the index of responsibility in the array
        const responsibilityIndex = student.resume.responsibility.findIndex((item, index) => index.toString() === req.params.index);

        if (responsibilityIndex === -1) {
            return res.status(404).json({ message: "Responsibility not found" });
        }
        student.resume.responsibility[responsibilityIndex] = req.body.responsibility;

        await student.save();

        console.log(student); // Check the updated student object in the console

        res.json({ message: "Responsibility Updated" });
    } catch (error) {
        console.error("Error in editResponsibility route:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

exports.deleteducation=catchAsyncErrors(async(req,res,next)=>{
    const student  = await Student.findById(req.id).exec()
    const filtererdedu=student.resume.education.filter((i)=>i.id!=req.params.eduid)
    student.resume.education=filtererdedu;
    await student.save();
    res.json({message:"Deletion Successful!"});
})
exports.deletproject=catchAsyncErrors(async(req,res,next)=>{
    const student  = await Student.findById(req.id).exec()
    const filtererdprojects=student.resume.projects.filter((i)=>i.id!=req.params.eduid)
    student.resume.projects=filtererdprojects;
    await student.save();
    res.json({message:"Deletion Successful!"});
})

exports.deleteresponsibility = catchAsyncErrors(async (req, res, next) => {
    try {
      const student = await Student.findById(req.id).exec();
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      const indexToDelete = parseInt(req.params.index);
      if (isNaN(indexToDelete) || indexToDelete < 0 || indexToDelete >= student.resume.responsibility.length) {
        return res.status(400).json({ message: "Invalid index" });
      }
      student.resume.responsibility.splice(indexToDelete, 1);
      await student.save();
      console.log(student); // Check the updated student object in the console
      res.json({ message: "Responsibility Deleted", responsibility: student.resume.responsibility });
    } catch (error) {
      console.error("Error in deleteResponsibility route:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
  exports.deleteachievement = catchAsyncErrors(async (req, res, next) => {
    try {
      const student = await Student.findById(req.id).exec();
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      const indexToDelete = parseInt(req.params.index);
      if (isNaN(indexToDelete) || indexToDelete < 0 || indexToDelete >= student.resume.achievements.length) {
        return res.status(400).json({ message: "Invalid index" });
      }
      student.resume.achievements.splice(indexToDelete, 1);
      await student.save();
      console.log(student); // Check the updated student object in the console
      res.json({ message: "Achievement Deleted", achievement: student.resume.achievements });
    } catch (error) {
      console.error("Error in deleteachievement route:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

  exports.deleteachievement = catchAsyncErrors(async (req, res, next) => {
    try {
      const student = await Student.findById(req.id).exec();
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      const indexToDelete = parseInt(req.params.index);
      if (isNaN(indexToDelete) || indexToDelete < 0 || indexToDelete >= student.resume.achievements.length) {
        return res.status(400).json({ message: "Invalid index" });
      }
      student.resume.achievements.splice(indexToDelete, 1);
      await student.save();
      console.log(student); // Check the updated student object in the console
      res.json({ message: "Achievement Deleted", achievement: student.resume.achievements });
    } catch (error) {
      console.error("Error in deleteResponsibility route:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  exports.deleteskill = catchAsyncErrors(async (req, res, next) => {
    try {
      const student = await Student.findById(req.id).exec();
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      const indexToDelete = parseInt(req.params.index);
      if (isNaN(indexToDelete) || indexToDelete < 0 || indexToDelete >= student.resume.skills.length) {
        return res.status(400).json({ message: "Invalid index" });
      }
      student.resume.skills.splice(indexToDelete, 1);
      await student.save();
      console.log(student); // Check the updated student object in the console
      res.json({ message: "Responsibility Deleted", responsibility: student.resume.skills });
    } catch (error) {
      console.error("Error in deleteResponsibility route:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
exports.deletejob=catchAsyncErrors(async(req,res,next)=>{
    const student  = await Student.findById(req.id).exec()
    const filtererdjob=student.resume.jobs.filter((i)=>i.id!=req.params.eduid)
    student.resume.jobs=filtererdjob;
    await student.save();
    res.json({message:"Deletion Successful!"});
})

exports.deleteinternship=catchAsyncErrors(async(req,res,next)=>{
    const student  = await Student.findById(req.id).exec()
    const filteredInternships=student.resume.internships.filter((i)=>i.id!=req.params.eduid)
    student.resume.internships=filteredInternships;
    await student.save();
    res.json({message:"Deletion Successful!"});
})

