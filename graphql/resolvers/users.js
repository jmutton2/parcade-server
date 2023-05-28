const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

let secret_key = process.env.SECRET_KEY;

module.exports = {
	Mutation: {
		async register(
			_parent,
			{ registerInput: { username, email, password, confirmPassword } },
			context,
			info
		) {
			// validate user data (empty fields, etc...)
			// Make sure user doens't already exist
			// Hash password and create auth token

			password = await bcrypt.hash(password, 12);

			const newUser = new User({
				email,
				username,
				password,
				created_on: new Date().toISOString(),
			});

			console.log(newUser);

			const res = await newUser.save();

			console.log(res);

			const token = jwt.sign(
				{
					user_id: res.user_id,
					email: res.email,
					username: res._username,
				},
				secret_key,
				{ expiresIn: "1h" }
			);

			return {
				...res._doc,
				user_id: res.user_id,
				email: res.email,
				username: res.username,
				created_on: res.created_on,
				token,
			};
		},
	},
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
