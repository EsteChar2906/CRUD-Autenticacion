const bcrypt = require('bcryptjs');

const helpers = {
	encriptarContraseña: async(password) => {
		const salt = await bcrypt.genSalt(11);
		const hashear = await bcrypt.hash(password, salt);
		return hashear;
	},
	compararContraseña: async(password, savePassword) => {
		return await bcrypt.compare(password, savePassword);
	}
};

module.exports = helpers;