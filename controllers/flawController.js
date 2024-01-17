import flawService from "../services/flawService.js";

const flawController = {
    postFlaw: async (req, res) => {
        try {
            const newFlaw = await flawService.createFlaw(
                req.body,
            );
            res.status(201).json(newFlaw);
        } catch (error) {
            if (Array.isArray(error)) {
                res.status(400).json(error);
            } else {
                res.status(500).json({
                    error: "Error creating flaw",
                    message: error.message,
                });
            }
            console.log(error)
        }
    },

    getAllFlaws: async (req, res) => {
        try {
            const flaws = await flawService.getAllFlaws();
            res.status(200).json(flaws);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error retrieving flaws",
                message: error.message,
            });
        }
    },

    getFlawById: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    error: "Missing flaw ID",
                    message: "You must specify a flaw ID to retrieve it",
                });
            }

            const flaw = await flawService.getFlawById(
                req.params.id,
            );

            if (flaw) {
                return res.status(200).json(flaw);
            } else {
                return res.status(404).json({
                    error: `Flaw not found`,
                    message: `No flaw found with ID '${req.params.id}'`,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error retrieving flaw",
                message: error.message,
            });
        }
    },

    putFlaw: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    error: "Missing flaw ID",
                    message: "You must specify a flaw ID to update it",
                });
            }

            const updatedFlaw = await flawService.updateFlaw(
                req.params.id,
                req.body,
            );

            if (updatedFlaw) {
                return res.status(200).json(updatedFlaw);
            } else {
                return res.status(404).json({
                    error: `Flaw not found`,
                    message: `No flaw found with ID '${req.params.id}'`,
                });
            }
        } catch (error) {
            if (Array.isArray(error)) {
                res.status(400).json(error);
            } else {
                res.status(500).json({
                    error: "Error updating flaw",
                    message: error.message,
                });
            }
        }
    },

    deleteFlaw: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    error: "Missing flaw ID",
                    message: "You must specify a flaw ID to delete it",
                });
            }

            const flawDeleted = await flawService.deleteFlaw(
                req.params.id,
            );

            if (flawDeleted) {
                return res.status(200).json({
                        message: `Flaw with ID '${req.params.id}' deleted`,
                });
            } else {
                return res.status(404).json({
                    error: `Flaw not found`,
                    message: `No flaw found with ID '${req.params.id}'`,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error deleting flaw",
                message: error.message,
            });
        }
    },
};

export default flawController;