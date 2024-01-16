import db from "../config/db.js";
import {
	Role,
	User,
	Student,
	Caregiver,
	Group,
	Functionary,
} from "../models/index.js";
import {
	roles,
	users,
	students,
	caregivers,
	groups,
	functionaries,
} from "./index.js";

const importarDatos = async () => {
	try {
		await db.authenticate();
		await db.sync({ force: true });

		await Role.bulkCreate(roles);
		await User.bulkCreate(users);

		await Functionary.bulkCreate(functionaries);
		await Group.bulkCreate(groups);

		await Caregiver.bulkCreate(caregivers);
		await Student.bulkCreate(students);

		console.log(
			"\x1b[36m%s\x1b[0m",
			"A skilled seeder orchestrated a symphony of data growth, it planted the seeds of innovation, nurturing a flourishing garden of progress from a barren database.",
		);

		process.exit(0);
	} catch (error) {
		console.log(
			"\x1b[31m%s\x1b[0m",
			"Unfortunately, the seeder encountered a glitch, leaving the database barren and the seeds of progress unattended.",
		);
		console.log("ERROR: ", error);

		process.exit(1);
	}
};

if (process.argv[2] === "-i") {
	importarDatos();
}
