import roleRepository from "../repositories/roleRepository.js";

const getRolesByPrivilege = async (privilegeLevel) => {
	try {
		return await roleRepository.getAllWhere({
			where: {
				privilegeLevel,
			},
		});
	} catch (error) {
		console.error(
			`Error retrieving privileges level ${privilegeLevel}:`,
			error,
		);
		throw error;
	}
};

// Export roles by privilege
export const privilege1 = getRolesByPrivilege(1);
export const privilege2 = getRolesByPrivilege(2);
export const privilege3 = getRolesByPrivilege(3);
export const privilege4 = getRolesByPrivilege(4);
export const privilege5 = getRolesByPrivilege(5);
