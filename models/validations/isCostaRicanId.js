import { ValidationError } from "../../errors/index.js";

/**
 * Validates if the given ID is a valid Costa Rican ID.
 * @param {string} id - The ID to be validated.
 * @throws {Error} If the ID format is not valid.
 */
const isCostaRicanId = (id) => {
    const pattern = /^(?:[1-8]|1558)\d{8}$/;
    if (!pattern.test(id)) {
        throw new ValidationError("El formato del número de cédula no es válido, debe ser una cedula costarricense.");
    }
};

export { isCostaRicanId };