import cron from "node-cron";
import { Student, Functionary } from "../models/index.js";

const updateAges = async (Model) => {
	try {
		const records = await Model.findAll();

		const today = new Date();
		const currentMonth = today.getMonth();
		const currentDay = today.getDate();

		for (const record of records) {
			const birthDate = new Date(record.birthDate); // Convert to Date
			const birthMonth = birthDate.getMonth();
			const birthDay = birthDate.getDate() + 1;

			// Check if today is the student's birthday
			if (currentMonth === birthMonth && currentDay === birthDay) {
				const updatedAge = record.age + 1;

				// Update age in the database
				await record.update({ age: updatedAge });
				console.log(`Updated age: ${record.name}.`);
			}
		}
		console.log(`All ages verified for: ${Model.name}`);
	} catch (error) {
		console.log(error);
	}
};

cron.schedule("0 0 * * *", async () => {
	await updateAges(Student);
	await updateAges(Functionary);
});
