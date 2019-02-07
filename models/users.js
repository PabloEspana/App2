mongoose = require('mongoose') // Importa libreria mongoose
bcrypt = require('bcryptjs')   // Mètodos para encriptaciones
Schema = mongoose.Schema

// Esquema de la tabla usuarios de la base de datos
UserSchema = Schema({
    // Campos de datos del usuarios
    nombres: { type: String },
    apellidos: { type: String },
    correo: { type: String, unique: true },
    contrasena: { type: String },
    test: { type: Boolean, default:false },
    resultadoTest: {type: Array},
    tipoUsuario: { type: String, default: 'Estudiante' },
    fechaRegistro: { type: Date, default: new Date() },
    // Campos para guardar resultados de test
    // Nivel 1
    resultadoM1: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    resultadoM2: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    resultadoM3: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    resultadoM4: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    pruebaN1: {type: Array },
    // Nivel 2
    resultadoM1N2: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    resultadoM2N2: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    resultadoM3N2: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    resultadoM4N2: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    pruebaN1N2: {type: Array },
    // Nivel 3
    resultadoM1N3: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    resultadoM2N3: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    resultadoM3N3: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    resultadoM4N3: {type: Object, default:{r1:'Sin realizar', r2:'Sin realizar', r3:'Sin realizar', r4:'Sin realizar'}},
    pruebaN1N3: {type: Array }
})

// Cifra la contraseña
UserSchema.methods.generateHash = (password) => {
    // Se toma la contraseña ingresada y se encripta
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// Compara la contraseña ingresada por el usuario con la de la base de datos
UserSchema.methods.validatePassword = (password, user) => {
    // Se toma la contraseña ingresada y se compara con la de la base de datos
    return bcrypt.compareSync(password, user.contrasena)
}

module.exports = mongoose.model('User', UserSchema)