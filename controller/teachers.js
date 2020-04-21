const fs = require("fs");
const path = require("path");
const teachersDataPath = path.join(__dirname, "../data/teachers.json");

// - GET (all, individual)
const getAllTeachers = (req,res) => {
    fs.readFile(teachersDataPath, "utf-8", (err,data) => {
        if (err) throw err;
        res.status(200).json(JSON.parse(data));
    })
};

const getTeacher = (req,res) => {
    fs.readFile(teachersDataPath, "utf-8", (err, data) => {
      if (err) console.log(err);
      data = JSON.parse(data);
      const teacher = data.find(
        ({ name }) => name.toLowerCase() === req.params.name.toLowerCase()
      );
  
      if (teacher) {
        return res.status(200).json(teacher);
      }
      res.status(404).json({ error: "Teacher not found" });
    });
  };
// - PUT (individual)

const putTeacher =  (req, res) => {
    let teachers = fs.readFileSync(teachersDataPath, "utf-8");
    teachers = JSON.parse(teachers);
    if (req.params.name && req.body) {
      teachers = teachers.map((teacher) => {
        if (teacher.name.toLowerCase() === req.params.name.toLowerCase()) {
          Object.assign(teacher, req.body);
        }
        return teacher;
      });
    }
    fs.writeFileSync(teachersDataPath, JSON.stringify(teachers));
    res.send(teachers);
  };


// - DELETE (individual)

 const deleteTeacher = (req, res) => {
    let teachers = fs.readFileSync(teachersDataPath, "utf-8");
    teachers = JSON.parse(teachers);
  
    if (req.params.name) {
      teachers = teachers.filter(
        ({ name }) => name.toLowerCase() !== req.params.name.toLowerCase()
      );
      fs.writeFileSync(teachersDataPath, JSON.stringify(teachers));
    }
    res.send(teachers);
  };

  // - POST (individual)
const postTeachers =  (req, res) => {
    let teachers = fs.readFileSync(teachersDataPath, "utf-8");
    teachers = JSON.parse(teachers);
    teachers.push(req.body);
  
    if (teachers) {
      fs.writeFileSync(teachersDataPath, JSON.stringify(teachers));
      return res.send({
        status: "success",
        message: `teacher with name: ${req.body.name} added`
      });
    }
    res.send("NO!");
  };

module.exports = {
    getAllTeachers,
    getTeacher,
    putTeacher,
    deleteTeacher,
    postTeachers 
} 