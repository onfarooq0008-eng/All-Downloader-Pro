const express=require("express");

const router=express.Router();

const ytdlp=require("yt-dlp-exec");

const db=require("../database/database");


const {
downloadVideo,
downloadAudio
}=require("../services/downloader");




// Video Download

router.get("/video",async(req,res)=>{


try{


const url=req.query.url;



const info=await ytdlp(url,{
dumpSingleJson:true
});



await downloadVideo(url);



db.run(

`INSERT INTO downloads
(url,title,type,ip)
VALUES(?,?,?,?)`,

[
url,
info.title,
"MP4",
req.ip
]

);



res.send(
"Video Download Started"
);



}

catch(error){

console.log(error);

res.send(
"Video Download Failed"
);

}


});





// Audio Download

router.get("/audio",async(req,res)=>{


try{


const url=req.query.url;



const info=await ytdlp(url,{
dumpSingleJson:true
});



await downloadAudio(url);



db.run(

`INSERT INTO downloads
(url,title,type,ip)
VALUES(?,?,?,?)`,

[
url,
info.title,
"MP3",
req.ip
]

);



res.send(
"Audio Download Started"
);



}

catch(error){

console.log(error);

res.send(
"Audio Download Failed"
);

}


});



module.exports=router;
