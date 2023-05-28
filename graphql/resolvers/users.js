const User = require("../../models/User");

module.exports = {
	Query: {
		async getUsers() {
			try {
				const users = await User.findAll();
				return users;
			} catch (e) {
				throw new Error(e);
			}
		},
	},
};
