import { ValidationError } from "../../errors/index.js";

/**
 * Validates if the given ID is a valid Costa Rican ID.
 * @param {string} id - The ID to be validated.
 * @throws {Error} If the ID format is not valid.
 */
const isCostaRicanId = (id) => {
    const pattern = /^(?:[1-9]|1558)\d{8}$/;
    const passport = /^[A-Z0-9]{6,15}$/;
    if (!pattern.test(id) && !passport.test(id)) {
        throw new ValidationError("El formato del no es ni cédula ni pasaporte, debe ser una cédula costarricense o un pasaporte.");
    } 
};

export { isCostaRicanId };