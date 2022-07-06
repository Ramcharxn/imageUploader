const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const fs = require("fs");
const imageUploader = require("./models/Image");

const app = express()

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV == "production"){
  app.use(express.static("client/build"))
}

mongoose.connect('')
.then(() => console.log('db connected'))
.catch(err => console.log(err.message))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  
  app.post("/", upload.single("testImage"),async (req, res) => {

    const saveImage =  imageUploader({
      name: req.body.name,
      img: {
        data: fs.readFileSync("uploads/" + req.file.filename),
        contentType: "image/png",
      },
    });
    await saveImage.save()
      // .then((res) => {
      //   console.log("image is saved");
      // })
      // .catch((err) => {
      //   console.log(err, "error has occur");
      // });
      res.send('image is saved')
  });
  
  
  app.get('/',async (req,res)=>{
    const allData = await imageUploader.find()
    res.json(allData)
  })

app.listen(process.env.PORT || 5000,()=>console.log('server running in port 5000'))