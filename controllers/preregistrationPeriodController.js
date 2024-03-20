import PreregistrationPeriod from "../models/PreregistrationPeriod.js";

const preregistrationPeriodController = {
    activate: async (req, res, next) => {
        try {
            const activePreregistrationPeriod = await PreregistrationPeriod.findByPk(1);

            console.log(activePreregistrationPeriod.active);

            if (activePreregistrationPeriod.active) {
                return res.status(404).json({ message: "Ya está activo el periodo de prematrícula" });
            }

             activePreregistrationPeriod.active = true;
             activePreregistrationPeriod.save();

             return res.status(200).json(activePreregistrationPeriod);
        } catch (error) {
            next(error);
        }
    },

    deactivate: async (req, res, next) => {
        try {
            const activePreregistrationPeriod = await PreregistrationPeriod.findByPk(1);

            console.log(activePreregistrationPeriod.active);

            if (!activePreregistrationPeriod.active) {
                return res.status(404).json({ message: "Ya está cerrado el periodo de prematrícula" });
            }

             activePreregistrationPeriod.active = false;
                activePreregistrationPeriod.save();

             return res.status(200).json(activePreregistrationPeriod);
        } catch (error) {
            next(error);
        }
    },

    state: async (req, res, next) => {
        try {
            const activePreregistrationPeriod = await PreregistrationPeriod.findByPk(1);

            return res.status(200).json(activePreregistrationPeriod);
        } catch (error) {
            next(error);
        }
    }

};

export default preregistrationPeriodController;