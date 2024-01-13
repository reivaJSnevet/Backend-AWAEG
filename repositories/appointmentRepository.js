import {Appointment} from "../models/index.js";

const appointmentRepository = {
    create: async (appointment) => {
        try{
            const newAppointment = await Appointment.create(appointment);
            return newAppointment;
        }catch(error){
            throw error;
        }
    },

    getAll: async () => {
        try{
            const appointments = await Appointment.findAll();
            return appointments;
        }catch(error){
            throw error;
        }
    },

    getById: async (appointmentId) => {
        try{
            const appointment = await Appointment.findByPk(appointmentId);
            return appointment;
        }catch(error){
            throw error;
        }
    },

    update: async (appointmentId, updatedFields) => {
        try{
            const appointmentUpdated = await Appointment.update(updatedFields, {where: {appointmentId}});
            return appointmentUpdated[0];
        }catch(error){
            throw error;
        }
    },

    delete: async (appointmentId) => {
        try{
            const appointmentDeleted = await Appointment.destroy({where: {appointmentId}});
            return appointmentDeleted;
        }catch(error){
            throw error;
        }
    }


}

export default appointmentRepository;