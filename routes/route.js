const routes = require('express').Router();
const controller = require('../controller/controller')
const model = require('../models/model')

//post: http://localhost:7070/api/categories
routes.route('/api/categories').post((req,res)=>{
    try {
         const data = new model.Categories(req.body)
          data.save();
          res.status(200).send({
             message:"data added",
             data
    })
    } catch (error) {
        res.status(500).send({
            message:"Server Error",
            error
        })
    }
    
});

//get: http://localhost:7070/api/categories
routes.route('/api/categories').get(async (req,res)=>{
    try {
        let data = await model.Categories.find({})

        let filter = await data.map(v =>Object.assign({},{type:v.type,color:v.color}))
          res.status(200).send({
             message:"data displayed",
             filter
    })
    } catch (error) {
        res.status(500).send({
            message:"Server Error",
            error
        })
    }
    
});
  
//post: http://localhost:7070/api/transaction
routes.route('/api/transaction').post((req,res)=>{
    try {
        const{name,type,amount} = req.body;

         const create = new model.Transaction({
            name,
            type,
            amount,
            date:new Date()
         })
         create.save();
          res.status(200).send({
             message:"data transaction",
             create
    })
    } catch (error) {
        res.status(500).send({
            message:"Server Error",
            error
        })
    }
    
});

//get: http://localhost:7070/api/transaction
routes.route('/api/transaction').get(async(req,res)=>{
    try {
       const data =await model.Transaction.find({})
          res.status(200).send({
             message:"data transaction",
             data
    })
    } catch (error) {
        res.status(500).send({
            message:"Server Error",
            error
        })
    }
    
});

//delete: http://localhost:7070/api/transaction
routes.route('/api/transaction').delete(async(req,res)=>{
    try {
      // const data =await model.Transaction.deleteOne(req.params.body)
       const data =await model.Transaction.deleteOne(req.body)
          res.status(200).send({
             message:"data deleted completed",
             data
             
             
    })
    } catch (error) {
        res.status(500).send({
            message:"Record not deleted",
            error
        })
    }
    
});

//get: http://localhost:7070/api/labels
routes.route('/api/labels').get(async (req,res)=>{
    try {
     const result =await model.Transaction.aggregate([
            {
                $lookup:{
                    from:"categories",
                    localField:"type",
                    foreignField:"type",
                    as:"categories_info"
                }
            },
            {
                $unwind:"$categories_info"
            }
        ])
      let data = await result.map(v =>Object.assign({},{_id:v._id,name:v.name,type:v.type,
                                 amount:v.amount,color:v.categories_info['color']}))
          res.status(200).send({
            
             message:"selected data displayed",
             data
            
    })
    } catch (error) {
        res.status(500).send({
            message:"Server Error",
            error
        })
    }
    
});


module.exports = routes;