const express = require("express");
const fs = require("fs");
const path = require("path");
const studentsDataPath = path.join(__dirname, "../data/students.json");

const getAllStudents = (req,res) => {
    fs.readFile(studentsDataPath, "utf-8", (err,data) => {
        if (err) throw err;
        res.status(200).json(JSON.parse(data));
    })
};


module.exports = {
    getAllStudents
} 