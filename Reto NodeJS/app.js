const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


app.post('/contact', upload.single('archivoDPI'), (req, res) => {
  const { nombre, email } = req.body;
  const archivoDPI = req.file.filename;


  const contacto = { nombre, email, archivoDPI };
  const jsonContactos = JSON.parse(fs.readFileSync('contactos.json', 'utf-8') || '[]');
  jsonContactos.push(contacto);
  fs.writeFileSync('contactos.json', JSON.stringify(jsonContactos, null, 2));

  res.redirect('/files');
});


app.get('/files', (req, res) => {
  const jsonContactos = JSON.parse(fs.readFileSync('contactos.json', 'utf-8') || '[]');
  res.render('files.html', { contactos: jsonContactos });
});

app.listen(port, () => {
  console.log(`Aplicación escuchando en http://localhost:${port}`);
});
