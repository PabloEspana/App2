'use stric'
const mongoose = require('mongoose'),
    app = require('./app'), // Llamo al archivo app
    port = process.env.PORT || 3000, // Definimos un  puerto para la app
    http = require('http').Server(app); // Se crea un servidor http
    url = "mongodb+srv://Administrador:2oRmnR58jfcFdpas@cluster0-no1gz.mongodb.net/aula" // Url de base de datos remota

// Conexiòn a la base de datos
mongoose.Promise = global.Promise;
mongoose.connect(url) // Se pone la url 
    .then(() => { // Si la conexiòn es realiada con exito
        console.log("Conectado a la base de datos correctmente");
        http.listen(port, () => {
            console.log("Aplicación corriendo en: http://localhost:" + port);
        });
    }).catch(err => console.log(err))  // Si hay error muestra mensaje
