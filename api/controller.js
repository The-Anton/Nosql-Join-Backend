var mongoose = require('mongoose');
const ErrorResponse = require('../util/errorResponse');
const MockOneData = require('./Model/MockOneData');
const MockSecondData = require('./Model/MockSecondData');

// returns MockOne collection documents
const getMockOneData = (req,res) => {
    MockOneData.find()
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.log(error);
        });
    
}

// returns MockSecond collection documents
const getMockSecondData = (req,res) => {
    MockSecondData.find()
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        });
    
}

// performs JOIN operation on MockOne and MockSecond collection and returns the resulted data
const getCollectionJoin = (req,res) => {
    MockOneData.aggregate([{
         
            $lookup: {
                from: "mockseconddatas",
                localField: "full_name",
                foreignField: "full_name",
                as: "full_details"
            }
    
        },
        {
            $replaceRoot: { 
                newRoot: { 
                    $mergeObjects: [ { 
                        $arrayElemAt: [ "$full_details", 0 ] 
                    }, "$$ROOT" ] } }
        },
        { 
            $project: { full_details: 0 } 
        }
    ]).exec((err,data) =>{
            return res.json(data);
    });
       
}

// load testing host verification end point
const verify = (req,res) => {
    res.download('./loaderio-77c7d9dc9cfa4028a37169d8f2f88462.txt');
}


module.exports ={
    getMockOneData,
    getMockSecondData,
    getCollectionJoin,
    verify
}


