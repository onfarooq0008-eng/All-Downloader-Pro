const ytdlp = require("yt-dlp-exec");
const path = require("path");
const fs = require("fs");


const downloadFolder = path.join(
__dirname,
"../downloads"
);


// Create download folder

if(!fs.existsSync(downloadFolder)){
    fs.mkdirSync(downloadFolder);
}


// Download Video

async function downloadVideo(url){

const output = path.join(
downloadFolder,
"%(title)s.%(ext)s"
);


await ytdlp(url,{

output:output,

format:"bestvideo+bestaudio/best",

mergeOutputFormat:"mp4",

noPlaylist:true

});


return output;

}



// Download Audio MP3

async function downloadAudio(url){

const output = path.join(
downloadFolder,
"%(title)s.%(ext)s"
);


await ytdlp(url,{

output:output,

extractAudio:true,

audioFormat:"mp3",

audioQuality:"0",

noPlaylist:true

});


return output;

}



module.exports={

downloadVideo,

downloadAudio

};
