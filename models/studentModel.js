
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const studentModel=new mongoose.Schema({
    role:{
        type:String,
        default:"student"
    },
    firstname:{
        type:String,
        required:[true,"Firstname is required"],
       minlength:[4,"Firstname should be atleast 4 char long"]
    },
    lastname:{
        type:String,
        required:[true,"Lastname is required"],
       minlength:[4,"Firstname should be atleast 4 char long"]
    },
   
    contact:{
        type:String,
       maxlength:[10,"Contact should be not exceed 10 char"],
       minlength:[10,"Contact should be atleast 10 char long"]

    },
    city:{
        type:String,

    },
    gender:{
        type:String,
        enum:["Male","Female","Others"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password:{
        type:String,
        select:false,
        maxlength:[15,"Password should exceed more than 15 char"],
        minlength:[6,"Password should atleast 6 char"]

    },
    resetPassword:{
        type:String,
        default:"0"
    },
    avatar:{
        type:Object,
        default:{
            fieldId:"",
            url:"https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D"
        }
    },
    resume:{
        education:[],
        jobs:[],
        internships:[],
        responsibility:[],
        courses:[],
        projects:[],
        skills:[],
        achievements:[],

    }
},
    {timestamps:true}

)
studentModel.pre("save",function(){
    if(!this.isModified("password")){
        return;
    }
    let salt=bcrypt.genSaltSync(10);
    this.password=bcrypt.hashSync(this.password,salt)
})

studentModel.methods.comparePassword=function(password){
    return bcrypt.compareSync(password,this.password)
}

studentModel.methods.getjwttoken=function(){
return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE
})
}
const Student=mongoose.model("Student",studentModel)
module.exports=Student