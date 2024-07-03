const express = require('express');
const multer = require("multer");
const { getStudents, getStudentById, createStudent, dataUpload, verifyUser } = require('../controllers/studentController');

//router obj
const router = express.Router();

//===================================File Upload using multer=======================================
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../fnodeproject/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
       // cb(null, file.fieldname + '-' + uniqueSuffix)
         cb(null, file.originalname)
    }



})
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        //var ext = file.extname(file.originalname);
       // console.log(file);
        console.log(file.mimetype);
        if (file.mimetype == 'text/csv' || file.mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            cb(null, true);
          
        }
        else {
            return cb("Error: Only CSV and Excel files are allowed!");  
        }
        
    }
})


//=====================Routes=====================================
router.get('/getall', getStudents);
router.get('/get/:id', getStudentById);
router.post('/create', createStudent);
router.post('/upload', upload.single('profile_img'), dataUpload);
router.get('/verify/:id', verifyUser);

module.exports = router;
