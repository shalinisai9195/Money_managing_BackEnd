const model = require('../models/model')


//get category

function create_categories(req,res){
   const data = new model.Categories({
     type:"Saving",
     color:"#1F3B5C"
   })
   
   data.save(function(err){
    if(!err) return res.json(data);

    return res.status(400).json({
        message:`Error while creating categories ${err}`
    })
   })
}

module.exports = {create_categories}