const express=require("express");

const router=express.Router();

const ytdlp=require("yt-dlp-exec");

const {
downloadVideo,
downloadAudio
}=require("../services/downloader");


// Video Information

router.post("/",async(req,res)=>{

try{

const url=req.body.url;


const info=await ytdlp(url,{
dumpSingleJson:true,
noWarnings:true
});


res.render("pages/result",{
info
});


}catch(error){

console.log(error);

res.send("Invalid URL");

}

});



// Video Download

router.get("/video",async(req,res)=>{

try{

const file=await downloadVideo(
req.query.url
);


res.download(file);


}catch(error){

console.log(error);

res.send("Video download failed");

}

});



// MP3 Download

router.get("/audio",async(req,res)=>{

try{

const file=await downloadAudio(
req.query.url
);


res.download(file);


}catch(error){

console.log(error);

res.send("Audio download failed");

}

});


module.exports=router;
