'use strict'

const LocalStrategy = require('passport-local').Strategy
var user = require('./models/users')
//var flash = require('connect-flash')

module.exports = (passport) => {

	passport.serializeUser((user, done) => {
		done(null, user.id);
	})

	passport.deserializeUser((id, done) => {
		user.findById(id, (err, user) => {
			done(err, user)
		})
	})

	// Resgistrar usuario
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'correo',  // Obtengo el correo 
		passwordField: 'contrasena', // Obtengo contraseña
		passReqToCallback: true
	}, (req, email, password, done) => {
		var newUser = new user()
		user.findOne({ 'correo': email }, (err, us) => {  // Priero compruebo que no exista un correo identico
			if (err) { return done(err) }
			if (us) {
				return done(null, false, req.flash('errorRegistro', 'Esta dirección de correo ya está registrada'))
			}
			else {
				if (password != req.body.contrasena2) { // Comparo contraseñas
					return done(null, false, req.flash('errorRegistro', 'Las contraseñas no coinciden'))
				} else { 
					// Si todo està correcto 
					// A los campos de la tabla usuario le enviò los datos del formulario de registro
					newUser.nombres = req.body.nombres  
					newUser.apellidos = req.body.apellidos
					newUser.correo = email
					newUser.contrasena = newUser.generateHash(password)  // Encripto la contraseña
					newUser.test = false
					newUser.save((err) => {  // Guardo el usuario
						if (err) { throw err }
						return done(null, newUser)
					})
				}
			}
		})
	}))

	// Mètodo para loguearse
	passport.use('local-login', new LocalStrategy({
		usernameField: 'correo',  // Obtengo correo 
		passwordField: 'contrasena', // Obtengo contraseña
		passReqToCallback: true
	}, (req, email, password, done) => {
		// Busco al usuario registrado con ese correo
		user.findOne({ 'correo': email }, (err, user) => {
			if (err) { return done(err) }
			if (!user) { // Si no encuentra
				return done(null, false, req.flash('errorLogin', 'Este estudiate no está registrdo'))
			}
			// Si la contraseña no es correcta
			if (!user.validatePassword(password, user)) {
				return done(null, false, req.flash('errorLogin', 'Contraseña incorrecta'))
			}
			// Si encuentra al usuario inicia sesiòn
			return done(null, user)
		})
	}))
}	