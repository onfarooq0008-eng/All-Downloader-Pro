const express=require("express");

const router=express.Router();

const ytdlp=require("yt-dlp-exec");

router.post("/",async(req,res)=>{

try{

const url=req.body.url;

if(!url){

return res.status(400).send("URL Required");

}

const info=await ytdlp(url,{

dumpSingleJson:true,

noWarnings:true,

noCheckCertificates:true

});

res.render("pages/result",{

info

});

}catch(err){

console.log(err);

res.status(500).send("Download Error");

}

});

module.exports=router;
