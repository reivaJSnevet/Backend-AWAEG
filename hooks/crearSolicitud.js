import Solicitud from "../models/Solicitud.js";

export const crear = async (instance) => {
  try {
    const solicitud = await Solicitud.create();
    instance.solicitudeId = solicitud.id;
  } catch (error) {
    throw error;
  }
};
