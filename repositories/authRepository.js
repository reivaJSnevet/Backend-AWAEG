import {
	User,
	Role,
	Person,
	Student,
	Functionary,
	Caregiver,
	Group,
} from "../models/index.js";

const authRepository = {
	getByUserName: async (username) => {
		try {
			const user = await User.scope("session").findByPk(username, {
				include: [
					{ model: Role },
					{
						model: Person,
						include: [
							{
								model: Student,
								include: [
									{ model: Group },
									{ model: Caregiver },
								],
							},
							{ model: Functionary },
						],
					},
				],
			});
			return user;
		} catch (error) {
			throw error;
		}
	},

	getByRefreshToken: async (refreshToken) => {
		try {
			const user = await User.scope("session").findOne({
				where: { refreshToken: refreshToken },
                include: [
					{ model: Role },
					{
						model: Person,
						include: [
							{
								model: Student,
								include: [
									{ model: Group },
									{ model: Caregiver },
								],
							},
							{ model: Functionary },
						],
					},
				],
			});
			return user;
		} catch (error) {
			throw error;
		}
	},

	getByToken: async (token) => {
		try {
			const user = await User.findOne({
				where: { token: token },
				attributes: ["userName", "email", "password", "refreshToken"],
				include: [
					{ model: Role },
					{
						model: Person,
						include: [
							{
								model: Student,
								include: [
									{ model: Group },
									{ model: Caregiver },
								],
							},
							{ model: Functionary },
						],
					},
				],
			});
			return user;
		} catch (error) {
			throw error;
		}
	},

	getByRecoveryToken: async (recoveryToken) => {
		try {
			const user = await User.findOne({
				where: { recoveryToken: recoveryToken },
				attributes: [
					"userName",
					"email",
					"password",
					"recoveryToken",
					"verifyEmail",
				],
				include: [
					{ model: Role },
					{
						model: Person,
						include: [{ model: Student }, { model: Functionary }],
					},
				],
			});
			return user;
		} catch (error) {
			throw error;
		}
	},

	getByEmail: async (email) => {
		try {
			const user = await User.findOne({
				where: { email: email },
				attributes: [
					"userName",
					"email",
					"password",
					"recoveryToken",
					"verifyEmail",
				],
				include: [
					{ model: Role },
					{
						model: Person,
						include: [
							{
								model: Student,
								include: [
									{ model: Group },
									{ model: Caregiver },
								],
							},
							{ model: Functionary },
						],
					},
				],
			});
			return user;
		} catch (error) {
			throw error;
		}
	},
};

export default authRepository;
