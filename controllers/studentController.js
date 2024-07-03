const multer = require("multer");
const nodemailer = require("nodemailer");
const csvtojson = require('csvtojson');
const db = require("../config/db");

// functui bt==to get all studnet list
const getStudents = async (req, res) => {
   // console.log("dffffffffffffffffffffff");
    try {
        const data = await db.query('SELECT * FROM users');
        if (!data) {
            res.status(404).send({
                success: false,
                message: 'No record found'


            });


        }
        res.status(200).send({
            success: true,
            totallength:data[0].length,
            message: 'All record found',
            data:data[0]

        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in get all studemt api',
            error



        });
    }


}  // e,py arrow function

//======================Get Student By Id
const getStudentById = async (req, res) => {
    console.log("dffffffffffffffffffffff");
    try {
        const studentId = req.params.id;
        if (!studentId) {
            res.status(404).send({
                success: false,
                message: 'Invalid student id'


            });
        }
        const data = await db.query('SELECT * FROM users WHERE ID =' + studentId);
        if (!data) {
            res.status(404).send({
                success: false,
                message: 'No record found!'
            });
        }

        res.status(200).send({
            success: true,
            studentDetails: data[0]

        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in geting by student Id',
            error



        });


    }

}

//============================Create Student API===========================================
const createStudent = async (req, res) => {
    //console.log("createeeeeeeeeeeeeeeeeeeeeeeeeeee");

    // Gernerate the link
    rand = Math.floor((Math.random() * 100) + 54);
    host = req.get('host');
  
    link = "http://" + req.get('host') + "/verify?id=" + rand;
   //  console.log(link);
    let mailTransporter =
        nodemailer.createTransport(
            {
                service: 'gmail',
                auth: {
                    user: 'depuz.pk@gmail.com',
                    pass: 'mukb ccse onow mghd'
                }
            }
        );

    let mailDetails = {
        from: 'depuz.pk@gmail.com',
        to: 'enowledgementor@gmail.com',
        subject: 'Test mail',
        text: 'Hello,<br> Please Click on the link to verify your email.<br><a href=' + link + '>Click here to verify</a>' 
    };

    try {

        const { name, email } = req.body
        if (!name || !email) {
            return res.status(500).send({
                success: false,
                message: 'Provide all fields'
            })
        }
        const data = await db.query('INSERT INTO users(name, email) VALUES(?,?)', [name, email]);
        if (!data) {
            return res.status(500).send({
                success: false,
                message: 'Error in inset query'
            })
        } else {

            mailTransporter
                .sendMail(mailDetails,
                    function (err, data) {
                        if (err) {
                            console.log(err);
                            console.log('Error Occurs');
                        } else {
                            console.log('Email sent successfully');
                        }
                    });

            res.status(200).send({
                success: true,
                message: "Data inserted into DB"
            })
        }
        ///////////email send on user creation///////////////////////
      

       

       

        /////////////////////////////////////////////////////////////

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in create student API',
            error

        })


    }
}
//==================file upload=====================
//const storage = multer

const dataUpload = async (req, res) => {
  
    //console.log(req.file);
   
     res.send('upload successfully');
        

}

//===================Veriffy User from email link=====================
const verifyUser = async (req, res) => {
   // console.log(req.params.id);
    try {
        const id  = req.params.id;
       // console.log(id);
        const data = await db.query('UPDATE users set user_status = 1 WHERE id= ?', [id]);
      //  console.log(data);
        if (!data) {
            return res.status(500).send({
                success: false,
                message: 'Error in update query'
            })
        }

        res.status(200).send({
            success: true,
            message: 'Update user status'

        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Invalid Information',
            error
        })

    }

}

module.exports = { getStudents, getStudentById, createStudent, dataUpload, verifyUser }; // eport multiple function so we use { }