var mongoose = require('mongoose');
const ErrorResponse = require('../util/errorResponse');
//const asyncHandler = require('../middleware/async');
const MockOneData = require('./Model/MockOneData');
const MockSecondData = require('./Model/MockSecondData');


const getMockOneData = (req,res) => {
    MockOneData.find()
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.log(error);
        });
    
}

const getMockSecondData = (req,res) => {
    MockSecondData.find()
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        });
    
}


const getCollectionJoin = (req,res) => {
    MockOneData.aggregate([{
         
            $lookup: {
                from: "mockseconddatas",
                localField: "full_name",
                foreignField: "full_name",
                as: "full_details"
            }
    
   }]).exec((err,data) =>{
        return res.json(data);
   });
       
}

// const getCollectionJoin = (req,res) => {
//     MockOneData.aggregate([
//         { 
//             $unionWith: "mockseconddatas"
//         }
//         ,function (error, data) {
//             return res.json(data);
//         //handle error case also
//    }]);
// }


module.exports ={
    getMockOneData,
    getMockSecondData,
    getCollectionJoin 
}


