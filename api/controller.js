var mongoose = require('mongoose');
const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');
const MockOneData = require('./Model/MockOneData');
const MockSecondData = require('./Model/MockSecondData');
var collectionStats = {};

// Get the size of collection
MockOneData.estimatedDocumentCount({},util);

function util(err,result){
    collectionStats.size = result;
}

// returns MockOne collection documents
const getMockOneData = asyncHandler(async  (req,res) => {
    MockOneData.find()
        .then((result) => {
            res.status(200).json({
                success: true,
                data: result
            });
        })
    
});

// returns MockSecond collection documents
const getMockSecondData = (req,res) => {
    MockSecondData.find()
        .then((result) => {
            res.status(200).json({
                success: true,
                data: result
            });
        })
    
}

// performs JOIN operation on MockOne and MockSecond collection 
// and returns the resulted data
async function getCollectionJoin(req,res){

    const lookup = {
        from: "mockseconddatas",
        localField: "full_name",
        foreignField: "full_name",
        as: "full_details"
    };
    
    const project = { full_details: 0 };

    // 1st parallel promise to 
    // perform JOIN on half documents of collection
    const firstCall =  new Promise((resolve,reject) => {
        MockOneData.aggregate([

            { $limit: collectionStats.size/2 },
            { $lookup: lookup},
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$full_details", 0 ] }, "$$ROOT" ] } }
            },
            { $project:  project }

        ]).exec((err,data) =>{
            resolve(data);
        });
                
    })
    
    // 2nd parallel promise to 
    // perform JOIN on next half documents of collection
    const secondCall = new Promise((resolve, reject) => {
        MockOneData.aggregate([

            { $skip: collectionStats.size/2 },
            { $lookup: lookup},
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$full_details", 0 ] }, "$$ROOT" ] } }
            },
            { $project:  project }

        ]).exec((err,data) =>{
            resolve(data);
        });
    
    })
        
        
    Promise.all([firstCall, secondCall]).then(values => {
        res.status(200).send(values);
    });
           
}

// load testing host verification end point
const verify = (req,res) => {
    res.status(200).download('./loaderio-77c7d9dc9cfa4028a37169d8f2f88462.txt');
}


module.exports ={
    getMockOneData,
    getMockSecondData,
    getCollectionJoin,
    verify
}


