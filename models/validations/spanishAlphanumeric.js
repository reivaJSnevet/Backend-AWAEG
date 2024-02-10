import { ValidationError } from "../../errors/index.js";

/**
 * Checks if a value is a Spanish alphanumeric string.
 * @param {string} value - The value to be checked.
 * @throws {Error} Throws an error if the value is not alphanumeric.
 */
const isSpanishAlphanumeric = (value) => {
	const regex = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]+$/i;
	if (!regex.test(value)) {
        throw new ValidationError("El valor debe contener solo caracteres alfanuméricos.");
    }
};

/**
 * Checks if the given value contains only Spanish alphabetic characters and spaces.
 * 
 * @param {string} value - The value to be validated.
 * @throws {Error} Throws an error if the value contains non-alphabetic characters.
 */
const isSpanishAlpha = (value) => {
	const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/i;
	if (!regex.test(value)) {
        throw new ValidationError("El valor debe contener solo caracteres alfabéticos.");
    }
};

export { isSpanishAlphanumeric, isSpanishAlpha };
