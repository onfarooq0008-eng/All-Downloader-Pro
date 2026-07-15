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


db.get(
"SELECT COUNT(*) as total FROM downloads",
(err,total)=>{


db.get(

`SELECT COUNT(*) as today 
FROM downloads 
WHERE date(created_at)=date('now')`,

(err,today)=>{


db.all(

`SELECT * FROM downloads 
ORDER BY id DESC 
LIMIT 10`,

(err,recent)=>{


res.render(
"admin/dashboard",
{

admin:req.session.admin,

totalDownloads: total ? total.total : 0,

todayDownloads: today ? today.today : 0,

recentDownloads: recent || []

}

);


});


});


});


});


// Logout

router.get("/logout",(req,res)=>{


req.session.destroy(()=>{

res.redirect("/admin/login");

});


});

// Settings Page

router.get(
"/settings",
adminAuth,
(req,res)=>{


db.get(

"SELECT * FROM settings LIMIT 1",

(err,settings)=>{


res.render(
"admin/settings",
{
settings:settings || {}
}
);


});


});




// Save Settings

router.post(
"/settings",
adminAuth,
(req,res)=>{


const {
site_name,
logo,
theme,
announcement
}=req.body;



db.get(

"SELECT * FROM settings LIMIT 1",

(err,row)=>{


if(row){


db.run(

`UPDATE settings SET
site_name=?,
logo=?,
theme=?,
announcement=?
WHERE id=?`,

[
site_name,
logo,
theme,
announcement,
row.id
]

);


}

else{


db.run(

`INSERT INTO settings
(site_name,logo,theme,announcement)
VALUES(?,?,?,?)`,

[
site_name,
logo,
theme,
announcement
]

);


}



res.redirect(
"/admin/settings"
);


});


});

module.exports=router;

router.get(
"/history",
adminAuth,
(req,res)=>{


db.all(

"SELECT * FROM downloads ORDER BY id DESC",

(err,data)=>{


res.render(
"admin/history",
{
downloads:data
}
);


});


});
