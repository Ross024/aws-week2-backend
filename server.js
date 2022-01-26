const express = require("express")
const multer = require("multer")
const fs = require("fs")

const app = express()
const upload = multer({ dest: 'images'})

app.get("/", (req, res) => {
    res.send("💩")
})

app.get('/images/:imageName', (req, res) => {
    // do a bunch of if statements to make sure the user is
    // authorized to view this image, then

    const imageName = req.params.imageName
    const readStream = fs.createReadStream(`images/${imageName}`)
    readStream.pipe(res)
})

app.post("/api/images", upload.single('image'), (req, res) => {
    const imagePath = req.file.path
    const description = req.body.description

    console.log(description, imagePath)
    res.send({description, imagePath})
})


const port = process.env.PORT || 8080
app.listen(port, () => console.log(`listening on port ${port}`))