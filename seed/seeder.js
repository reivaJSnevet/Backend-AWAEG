import db from "../config/db.js";
import { Role, User, Student, Caregiver, Group, Functionary } from "../models/index.js";
import { roles, users, students, caregivers, groups, functionaries } from "./index.js";

const importarDatos = async () => {
	/* const transaction = await db.transaction(); */

	try {
		await db.authenticate();
		await db.sync({ force: true });

		await Role.bulkCreate(roles/* , { transaction } */);
		await User.bulkCreate(users/* , { transaction } */);

        await Functionary.bulkCreate(functionaries/* , { transaction } */);
        await Group.bulkCreate(groups/* , { transaction } */);
        
        await Caregiver.bulkCreate(caregivers/* , { transaction } */);
        await Student.bulkCreate(students/* , { transaction } */);

		console.log(
			"A skilled seeder orchestrated a symphony of data growth, it planted the seeds of innovation, nurturing a flourishing garden of progress from a barren database.",
		);

       /*  await transaction.commit(); */
		process.exit(0);
	} catch (error) {
		console.log(
			"Unfortunately, the seeder encountered a glitch, leaving the database barren and the seeds of progress unattended.",
			"ERROR: ",
			error,
		);

		/* await transaction.rollback(); */
		process.exit(1);
	}
};

if (process.argv[2] === "-i") {
	importarDatos();
}
