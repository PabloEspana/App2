express = require('express'); // Nos sirve para crear mètodos de registro y consulta
router = express.Router();  // Creamos un router
user = require('../models/users')

// Envìa los estudiantes registrados para que el administrador los vea
router.get('/', ensureAuthenticated, (req, res) => {
    user.find({ tipoUsuario: 'Estudiante' }, (err, estudiantes) => { // Sentencia para consultar
        if (err) { // Si hay error
            console.log(err)
        } else {
            if (!estudiantes) { // Si no se encientran estudiantes se muestra un mensaje en consola
                console.log("No hay estudiantes")
            } else {
                // Si encuentra alumnos los envía a las vistas html para mostrarlos en tablas
                res.render('inicio', { estudiantes: estudiantes })
            }
        }
    })
})

router.get('/login',  (req, res) => {
    res.render("login")  // Envvìa la pàgina de login
})

router.get('/registro', (req, res) => {
    res.render("registro") // Envvìa la pàgina de registro
})

router.get('/logout', (req, res) => {
    req.logout()    // Cierra la sesiòn
    res.redirect('/')  // Redirecciona al inicio de la pàgina
})


// Mètodo para controlar si el usuario està logueado
function ensureAuthenticated(req, res, next) {
    // si està logueado le permite continuar
    if (req.isAuthenticated())
        return next()
    else // si no està logueado lo redirige al login
        res.redirect('/login')
}

module.exports = router