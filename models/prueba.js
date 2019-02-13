mongoose = require('mongoose')
bcrypt = require('bcryptjs')
Schema = mongoose.Schema

PruebaSchema = Schema({
	identificador: {tyoe: String},
    nombre: { type: String },
    campo1: { type: String },
    campo2: { type: String },
    campo3: { type: String },
    foto: { type: String },
});

module.exports = mongoose.model('Prueba', PruebaSchema)
