const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const bcrypt = require("bcrypt");


const dbPath = path.join(
__dirname,
"app.db"
);


const db = new sqlite3.Database(dbPath);


// Create tables

db.serialize(()=>{


// Admin table

db.run(`

CREATE TABLE IF NOT EXISTS admins(

id INTEGER PRIMARY KEY AUTOINCREMENT,

username TEXT UNIQUE,

password TEXT,

created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)

`);



// Download history

db.run(`

CREATE TABLE IF NOT EXISTS downloads(

id INTEGER PRIMARY KEY AUTOINCREMENT,

url TEXT,

title TEXT,

type TEXT,

ip TEXT,

created_at DATETIME DEFAULT CURRENT_TIMESTAMP

)

`);




// Settings

db.run(`

CREATE TABLE IF NOT EXISTS settings(

id INTEGER PRIMARY KEY AUTOINCREMENT,

site_name TEXT,

logo TEXT,

theme TEXT,

announcement TEXT

)

`);

});



// Create default admin

db.get(
"SELECT * FROM admins WHERE username=?",
["admin"],
async(err,row)=>{


if(!row){


const password = await bcrypt.hash(
"admin123",
10
);


db.run(

"INSERT INTO admins(username,password) VALUES(?,?)",

[
"admin",
password
]

);


console.log(
"Default admin created"
);


}


});



module.exports=db;
