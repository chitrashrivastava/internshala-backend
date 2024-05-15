const { catchAsyncErrors } = require('../middlewares/catchAsyncError')
const Student = require('../models/studentModel');
const ErrorHandler = require('../utils/ErrorHandler');
const { sendmail } = require('../utils/nodemailer');
const Internship = require('../models/internshipMode')
const Job = require("../models/jobModel")
const employee=require('../models/employeeModel')
const { sendToken } = require('../utils/sendToken');
const path = require('path');

const imagekit = require('../utils/imagekit').initimagekit()
exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "Secure Homepage!" })


});


exports.studentSignup = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;
    const existingid = await employee.findOne({ email });

    if (existingid) {
        return res.status(400).json({ error: 'Email already registered as an Employee.' });
    }
    const student = await new Student(req.body).save();
    sendToken(student, 201, res)
    res.status(201).json({ message: 'Student registered successfully.' });
});
    
exports.studentSignin = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email }).select("+password").exec()
    if (!student)
        return next(new ErrorHandler("User not found with this email address", 404))
    const isPasswordMatched = await student.comparePassword(req.body.password)
    if (!isPasswordMatched)
        return next(new ErrorHandler("Wrong Credentials", 401))
    sendToken(student, 200, res)


})

exports.studentSignout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("token")
    res.json({ message: "Successfully Signout" })
})

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    res.json({ student })
})

exports.studentSendmail = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email }).exec()
    if (!student) {
        return next(
            new ErrorHandler("User Not Found with this email address", 404)
        )
    }
    const url1 = `${req.protocol}://${req.get("host")}/user/student/forget-link/${student._id}`
    const url = `http://localhost:5173/user/student/forget-link/${student._id}`
    sendmail(req,url1, res, url, next)
    res.json({ student, url1 })
    student.resetPassword = "1"
    await student.save()
})

exports.internships = catchAsyncErrors(async (req, res, next) => {

    const internships = await Internship.find().populate("employee")
    console.log(internships)
    res.json({ internships })

})

exports.studentforgetlink = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.params.id).exec();
    
    if (!student) {
        return next(new ErrorHandler("User Not Found with this email address", 404));
    }

    if (student.resetPassword === "1") {
        student.resetPassword = "0";
        student.password = req.body.password;
    } else {
        return next(new ErrorHandler("Link Expired", 404));
    }

    await student.save();

    res.status(200).json({ message: "Password Updated Successfully" });
});

exports.studentresetpassword = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    student.password = req.body.password
    await student.save()
    res.status(200).json({ message: "Password Updated Successfully" })

})

exports.studentupdate = catchAsyncErrors(async (req, res, next) => {
    const studentId = req.params.id;
    const update = req.body;
    console.log(update)
    const updatedStudent = await Student.findByIdAndUpdate(studentId, update).exec();

    if (!updatedStudent) {
        return next(new ErrorHandler("Student not found", 404));
    }

    res.status(200).json({
        message: "Student Updated Successfully",
        student: updatedStudent
    });
});

exports.studentavatar = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.params.id).exec();
    const file = req.files.avatar;
    console.log(file);
    console.log("Before Delete - Avatar Field ID:", student.avatar.fieldId);

    if (student.avatar.fieldId && student.avatar.fieldId !== "") {
        await imagekit.deleteFile(student.avatar.fieldId);
        console.log("File Deleted Successfully");
    } else {
        console.log("Skipping Delete - Missing or Empty Field ID");
    }
    
    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;

    try {
        const { fieldId, url } = await imagekit.upload({
            file: file.data,
            fileName: modifiedFileName,
        });
        console.log("File Data:", file.data);
        console.log("File Name:", file.name);
        
        student.avatar = { fieldId, url };
        await student.save();

        res.status(200).json({
            message: "Profile Updated Successfully",
        });
    } catch (error) {
        console.error("ImageKit Upload Error:", error);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
});

// Apply internships and job


exports.applyinternship = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const internship = await Internship.findById(req.params.internshipid).exec();
    console.log(student,internship)
    // Check if the student or internship is not found
    if (!student || !internship) {
        return res.status(404).json({ error: 'Student or internship not found.' });
    }

    // Check if the student has already applied to this internship
    if (internship.students.includes(student._id)) {
        return res.status(400).json({ error: 'Student has already applied to this internship.' });
    }

    student.internships = student.internships || [];
    internship.students = internship.students || [];

    student.internships.push(internship._id);
    internship.students.push(student._id);

    await student.save();
    await internship.save();
    res.json({ student, internship });
});


exports.applyjob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const job = await Job.findById(req.params.jobid).exec();

    // Check if the student has already applied to this job
    if (student.jobs.includes(job._id)) {
        return res.status(400).json({ error: 'Student has already applied to this job.' });
    }

    student.jobs = student.jobs || [];
    job.students = job.students || [];

    student.jobs.push(job._id);
    job.students.push(student._id);

    await student.save();
    await job.save();
    res.json({ student, job });
});
exports.jobs = catchAsyncErrors(async (req, res, next) => {

    const jobs = await Job.find().populate("employee")
    console.log(jobs)
    res.json({ jobs })

})

// ...

exports.myapplication = catchAsyncErrors(async (req, res, next) => {
    try {
        const student = await Student.findById(req.id).exec();
        const appliedJobs = await Job.find({ _id: { $in: student.jobs } }).populate("employee");
        const appliedInternships = await Internship.find({ _id: { $in: student.internships } }).populate("employee");

        res.json({ appliedJobs, appliedInternships });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});