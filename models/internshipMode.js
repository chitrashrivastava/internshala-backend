
const mongoose=require('mongoose')
const internshipModel=new mongoose.Schema({
    students:[{type:mongoose.Schema.Types.ObjectId,ref:"student"}],
    employee:{type:mongoose.Schema.Types.ObjectId,ref:'Employee'},
    profile:String,
    internshiptype:{
        type:String,
        enum:["In office","Remote"]
    },
    skills:String,
    openings:Number,
    from:String,
    to:String,
    duration:String,
    stipend:{
        status:{
            type:String,
        enum:["Fixed","Performance Based","Negotiable","Unpaid"]
        },
        amount:Number
    },
    perks:String,
    assessment:String,
    
},
    {timestamps:true}

)


const Internship = mongoose.model('internship', internshipModel);
module.exports = Internship;