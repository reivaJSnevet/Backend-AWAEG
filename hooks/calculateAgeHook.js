const calculateAge = (person) => {
	const today = new Date();
	const birthDate = new Date(person.birthDate);
	const age = today.getFullYear() - birthDate.getFullYear();

	person.age =
		today >=
		new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
			? age
			: age - 1;
};

export default calculateAge;
