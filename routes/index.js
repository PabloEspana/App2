express = require('express'); // Nos sirve para crear mètodos de registro y consulta
router = express.Router();  // Creamos un router
user = require('../models/users')
prueba = require('../models/prueba')


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

router.get('/personas', (req, res) => {
    prueba.find({}, (err, datos) => { // Sentencia para consultar
        if (err) { // Si hay error
            console.log(err)
        } else {
            if (!datos) { // Si no se encientran estudiantes se muestra un mensaje en consola
                console.log("No hay datos")
            } else {
                // Si encuentra alumnos los envía a las vistas html para mostrarlos en tablas
                res.send(datos)
            }
        }
    })
})

router.get('/persona/:id', (req, res) => {
    prueba.findOne({ codigo : req.params.id }, (err, datos) => { // Sentencia para consultar
        if (err) { // Si hay error
            console.log(err)
        } else {
            if (!datos) { // Si no se encientran estudiantes se muestra un mensaje en consola
                console.log("No hay datos")
            } else {
                // Si encuentra alumnos los envía a las vistas html para mostrarlos en tablas
                res.send(datos)
            }
        }
    })
})

router.delete('/persona/:id', (req, res) => {
    prueba.deleteOne({ codigo : req.params.id }, (err, eliminado) => { // Sentencia para consultar
        if (err) { // Si hay error
			return res.send("Error al eliminar")
        } else {
            if (!eliminado) { // Si no se encientran estudiantes se muestra un mensaje en consola
				return res.send("No existe")
            } else {
                // Si encuentra alumnos los envía a las vistas html para mostrarlos en tablas
				return res.send("Eliminado")
            }
        }
    })
})


router.post('/personas', (req, res) => {
	var contenido = { 
					codigo: req.body.codigo, 
					nombre: req.body.nombre, 
					campo1: req.body.campo1,
					campo2: req.body.campo2, 
					campo3: req.body.campo3, 
					foto: req.body.foto
				};

    prueba.findOne({ codigo : req.body.codigo }, (err, resultado) => { // Sentencia para consultar
        if (err) {
			return res.send("Error al comprobar")
        } else {
            if (resultado) {
				return res.send("Ya existe un registro con este identificador")
            } else {
				prueba.create(req.body, (err, result) => {
					if (err) {
						return res.send("Error")
					}else{
						if (!result) {
							return res.send("Error al registrar")
						}else{
							return res.send("Registrado") 
						}
					}
				})
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