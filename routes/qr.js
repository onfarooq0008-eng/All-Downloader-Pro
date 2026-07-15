const express = require("express");
const QRCode = require("qrcode");

const router = express.Router();


// QR Generator Page

router.get("/", (req,res)=>{

res.render("pages/qr");

});


// Generate QR

router.post("/generate", async(req,res)=>{


try{


const {url}=req.body;


if(!url){

return res.send("URL required");

}



const qr = await QRCode.toDataURL(url);


res.render(
"pages/qr-result",
{
qr,
url
}
);



}

catch(error){

console.log(error);

res.send("QR Error");

}


});



// API QR

router.get("/api", async(req,res)=>{


try{


const url=req.query.url;


const qr=await QRCode.toDataURL(url);


res.json({

success:true,

qr

});


}

catch(error){


res.json({

success:false

});


}


});


module.exports=router;
