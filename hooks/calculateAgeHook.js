/**
 * Calculates the age of a person based on their birth date.
 * @param {Object} person - The person object containing the birth date.
 * @param {string} person.birthDate - The birth date of the person in string format (YYYY-MM-DD).
 * @returns {void}
 * @throws {Error} If an error occurs during the calculation.
 */
const calculateAge = (person) => {
	try {
		const today = new Date();
		const birthDate = new Date(person.birthDate);
		const age = today.getFullYear() - birthDate.getFullYear();

		person.age =
			today >=
			new Date(
				today.getFullYear(),
				birthDate.getMonth(),
				birthDate.getDate(),
			)
				? age
				: age - 1;
	} catch (error) {
		throw error;
	}
};

export default calculateAge;
