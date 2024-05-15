const {catchAsyncErrors}=require('../middlewares/catchAsyncError')
const Employee=require('../models/employeeModel');
const ErrorHandler = require('../utils/ErrorHandler');
const { sendmail } = require('../utils/nodemailer');
const { sendToken } = require('../utils/sendToken');
const Internship=require('../models/internshipMode')
const Job=require('../models/jobModel')
const student=require('../models/studentModel')
const path=require('path')
const imagekit=require('../utils/imagekit').initimagekit()
exports.homepage= catchAsyncErrors(async(req,res,next)=>{
    res.json({message:"Secure Employee Homepage!"})


});

exports.employeeSignup= catchAsyncErrors(async(req,res,next)=>{
    const {email}=req.body;
    const existingid=await student.findOne({email})
    if (existingid) {
        return res.status(400).json({ error: 'Email already registered as an student' });
    }
    const employee = await new Employee(req.body).save();
    sendToken(employee, 201, res)
    res.status(201).json({ message: 'Employee registered successfully.' });

})

exports.employeeSignin= catchAsyncErrors(async(req,res,next)=>{
    const employee=await Employee.findOne({email:req.body.email}).select("+password").exec()
    if(!employee)
    return next(new ErrorHandler("User not found with this email address",404))
    const isPasswordMatched=await employee.comparePassword(req.body.password)
    if(!isPasswordMatched)
    return next(new ErrorHandler("Wrong Credentials",401))
    sendToken(employee,200,res)


})

exports.employeeSignout= catchAsyncErrors(async(req,res,next)=>{
res.clearCookie("token")
res.json({message:"Successfully Signout"})
})

exports.currentUser=catchAsyncErrors(async(req,res,next)=>{
    const employee=await Employee.findById(req.id).exec()
    res.json({employee})
})

exports.employeeSendmail=catchAsyncErrors(async(req,res,next)=>{
    const employee=await Employee.findOne({email:req.body.email}).exec()
    if(!employee){
        return next(
            new ErrorHandler("User Not Found with this email address",404)
        )
    }
    const url1 = `${req.protocol}://${req.get("host")}/user/employee/forget-link/${student._id}`
    const url = `http://localhost:5173/user/employee/forget-link/${employee._id}`
    sendmail(req,url1, res, url, next)
    res.json({employee,url})
    employee.resetPassword="1"
    await employee.save()
})

exports.employeeforgetlink=catchAsyncErrors(async(req,res,next)=>{
    const employee=await Employee.findById(req.params.id).exec()
    if(!employee){
        return next(
            new ErrorHandler("User Not Found with this email address",404)
        )
    }
    if(employee.resetPassword=="1"){
        employee.resetPassword="0"
        employee.password=req.body.password
    }
    else{
        return next(
            new ErrorHandler("Link Expired",404)
        )
    }
    await employee.save()
  
    res.status(200).json({message:"Password Updated Successfully"})
    
})


exports.employeeresetpassword=catchAsyncErrors(async(req,res,next)=>{
    const employee=await Employee.findById(req.id).exec()
    employee.password=req.body.password
    await employee.save()
    res.status(200).json({message:"Password Updated Successfully"})
    
})

exports.employeeupdate = catchAsyncErrors(async (req, res, next) => {
    const employeeId = req.params.id;
    const update = req.body;
console.log(update)
    const updatedemployee = await Employee.findByIdAndUpdate(employeeId, update).exec();

    if (!updatedemployee) {
        return next(new ErrorHandler("employee not found", 404));
    }

    res.status(200).json({
        message: "employee Updated Successfully",
        employee: updatedemployee
    });
});


exports.employeeavatar = catchAsyncErrors(async (req, res, next) => {
    const employee = await Employee.findById(req.params.id).exec();
    const file = req.files.organisationLogo;
    console.log(file);
    console.log("Before Delete - Avatar Field ID:", employee.organisationLogo.fieldId);

    if (employee.organisationLogo.fieldId && employee.organisationLogo.fieldId !== "") {
        await imagekit.deleteFile(employee.organisationLogo.fieldId);
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
        
        employee.organisationLogo = { fieldId, url };
        await employee.save();

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


// ----------------Internships------------------------

exports.createinternship=catchAsyncErrors(async(req,res,next)=>{
    const employe=await Employee.findById(req.id).exec()
    const internship=await new Internship(req.body).save()
    internship.employee=employe._id;
    employe.internships.push(internship._id)
    await internship.save()
    await employe.save()
   res.status(200).json({
    success:true,
    internship
   })

})
exports.readinternship=catchAsyncErrors(async(req,res,next)=>{
    const {internships}=await Employee.findById(req.id).populate("internships").exec()
    console.log(internships)
    res.status(200).json({
        internships
    })


})

exports.readsingleinternship=catchAsyncErrors(async(req,res,next)=>{
    const internship=await Internship.findById(req.params.id).exec()
    res.status(200).json({
        internship
    })
    
})

// ----------------Jobs------------------------

exports.createjob=catchAsyncErrors(async(req,res,next)=>{
    const employe=await Employee.findById(req.id).exec()
    const job=await new Job(req.body).save()
    job.employee=employe._id;
    employe.jobs.push(job._id)
    await job.save()
    await employe.save()
   res.status(200).json({
    success:true,
    job
   })

})
exports.readjob = catchAsyncErrors(async (req, res, next) => {
    const employee = await Employee.findById(req.id).populate("jobs").exec();
    const jobs = employee.jobs; 
    console.log(jobs);
    res.status(200).json({
        jobs
    });
});

exports.readsinglejob=catchAsyncErrors(async(req,res,next)=>{
    const job=await Job.findById(req.params.id).exec()
    res.status(200).json({
        job
    })
    
}
)