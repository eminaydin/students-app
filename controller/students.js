const fs = require("fs");
const path = require("path");
const studentsDataPath = path.join(__dirname, "../data/students.json");


// - GET (all, individual)
const getAllStudents = (req,res) => {
    fs.readFile(studentsDataPath, "utf-8", (err,data) => {
        if (err) throw err;
        res.status(200).json(JSON.parse(data));
    })
};


const getStudent = (req,req) => {
    fs.readFile(studentsDataPath, "utf-8", (err, data) => {
      if (err) console.log(err);
      data = JSON.parse(data);
      const student = data.find(
        ({ name }) => name.toLowerCase() === req.params.name.toLowerCase()
      );
  
      if (student) {
        return res.status(200).json(student);
      }
      res.status(404).json({ error: "Student not found" });
    });
  };
// - PUT (individual)

const putStudent =  (req, res) => {
    let students = fs.readFileSync(studentsDataPath, "utf-8");
    students = JSON.parse(students);
    if (req.params.name && req.body) {
      students = students.map((student) => {
        if (student.name.toLowerCase() === req.params.name.toLowerCase()) {
          Object.assign(student, req.body);
        }
  
        return student;
      });
    }
    fs.writeFileSync(studentsDataPath, JSON.stringify(students));
    res.send(students);
  };


// - DELETE (individual)

 const deleteStudent = (req, res) => {
    let students = fs.readFileSync(studentsDataPath, "utf-8");
    students = JSON.parse(students);
  
    if (req.params.name) {
      students = students.filter(
        ({ name }) => name.toLowerCase() !== req.params.name.toLowerCase()
      );
      fs.writeFileSync(studentsDataPath, JSON.stringify(students));
    }
  
    res.send(students);
  };

  // - POST (individual)
const postStudent =  (req, res) => {
    let students = fs.readFileSync(studentsDataPath, "utf-8");
    students = JSON.parse(students);
    students.push(req.body);
  
    if (students) {
      fs.writeFileSync(studentsDataPath, JSON.stringify(students));
      return res.send({
        status: "success",
        message: `student with name: ${req.body.name} added`
      });
    }
  
    res.send("NO!");
  };


module.exports = {
    getAllStudents,
    getStudent,
    putStudent,
    deleteStudent,
    postStudent 
} 