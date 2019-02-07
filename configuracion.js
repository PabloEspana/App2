var user = require('./models/users');


function configuracionInicial() {

     // Se crea el usuario adeministrador
    User = new user()
    user.find({}, (err, usuarios) => {
        fecha = new Date()
        if (!usuarios.length) { // Si no hay usuarios
            var docente = {
                correo: 'admin@gmail.com',
                contrasena: User.generateHash('123456'),
                tipoUsuario: 'Docente',
                fechaRegistro: fecha,
            }
            user.create(docente, function (err, user) {
                if (err) { throw err };
                console.log("Administrador por defecto creado")
            });
        }

    })
}

module.exports = { configuracionInicial }