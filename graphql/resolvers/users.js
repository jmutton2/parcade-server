const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UserInputError } = require("apollo-server");

const {
	validateRegisterInput,
	validateLoginInput,
} = require("../../utils/validators.js");

require("dotenv").config();

let secret_key = process.env.SECRET_KEY;

function generateToken(user) {
	return jwt.sign(
		{
			id: user.user_id,
			email: user.email,
			username: user.username,
		},
		secret_key,
		{ expiresIn: "1h" }
	);
}

module.exports = {
	Mutation: {
		async login(_parent, { username, password }, _context, _info) {
			const { errors, valid } = validateLoginInput(username, password);

			if (!valid) {
				throw new UserInputError("Input is invalid", {
					errors,
				});
			}

			const user = await User.findOne({ where: { username } });

			if (!user) {
				errors.general = "User not found";
				throw new UserInputError("User not found", { errors });
			}

			const match = await bcrypt.compare(password, user.password);

			if (!match) {
				errors.general = "Incorrect credentials";
				throw new UserInputError("Incorrect credentials", { errors });
			}

			const token = generateToken(user);

			return {
				...user._doc,
				user_id: user.user_id,
				email: user.email,
				username: user.username,
				created_on: user.created_on,
				token,
			};
		},
		async register(
			_parent,
			{ registerInput: { username, email, password, confirmPassword } },
			_context,
			_info
		) {
			// validate user data input
			const { errors, valid } = validateRegisterInput(
				username,
				email,
				password,
				confirmPassword
			);

			if (!valid) {
				throw new UserInputError("Input is invalid", {
					errors,
				});
			}

			// Make sure user doesn't already exist
			const user = await User.findOne({ where: { username } });

			if (user) {
				throw new UserInputError("Username is taken", {
					errors: {
						username: "This username is taken",
					},
				});
			}

			password = await bcrypt.hash(password, 12);

			const newUser = new User({
				email,
				username,
				password,
				created_on: new Date().toISOString(),
			});

			const res = await newUser.save();

			const token = generateToken(res);

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
