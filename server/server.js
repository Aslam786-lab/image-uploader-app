const express = require('express');
const cors = require('cors')
const multer = require('multer')
const upload = multer()

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.use(cors())


app.post('/upload', upload.single('file'), (req, res) => {
    console.log('body', req.file.length, req.file)

    res.json({ success: true})
})

app.post('/profile-update', (req, res) => {
  const { imageUrl } = req.body;

  res.json({ imageUrl });
});

app.listen(port, error => {
    if(error) throw error;
    console.log('Server running on port ' + port);
})

