
const mongoose = require('mongoose')
const jobModel = new mongoose.Schema({
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }],
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    title: String,
    skill:String,
    jobtype: {
        type: String,
        enum: ["In office", "Remote"]
    },
    openings: Number,
    description: String,
    preferences: String,
    salary: Number,
    perks: String,
    assessment: String,

},
    { timestamps: true }

)


const Job = mongoose.model("jobs", jobModel)
module.exports = Job