const express=require("express");

const router=express.Router();

const bcrypt=require("bcrypt");

const db=require("../../database/database");

const adminAuth=require("../middleware/auth");


// Login Page

router.get("/login",(req,res)=>{

res.render("admin/login");

});



// Login Process

router.post("/login",(req,res)=>{


const {
username,
password
}=req.body;



db.get(

"SELECT * FROM admins WHERE username=?",

[username],

async(err,user)=>{


if(!user){

return res.send(
"Invalid Login"
);

}



const match = await bcrypt.compare(

password,

user.password

);



if(!match){

return res.send(
"Invalid Login"
);

}



req.session.admin={

id:user.id,

username:user.username

};



res.redirect("/admin/dashboard");


});


});



// Dashboard

router.get(
"/dashboard",
adminAuth,
(req,res)=>{


res.render(
"admin/dashboard",
{
admin:req.session.admin
}
);


});



// Logout

router.get("/logout",(req,res)=>{


req.session.destroy(()=>{

res.redirect("/admin/login");

});


});


module.exports=router;
