const mongoose = require('mongoose');

const conn = mongoose.connect(process.env.ATLAS_URI)
.then(db =>{
    console.log("DB conneted")
    return db;
}).catch(err =>{
    console.log("connection Error");
})

module.exports = conn;