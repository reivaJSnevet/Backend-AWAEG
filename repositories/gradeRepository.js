import {Grade} from "../models/index.js";

const gradeRepository = {
    create: async (grade) => {
        try{
            const newGrade = await Grade.create(grade);
            return newGrade;
        }catch(error){
            throw error;
        }
    },

    getAll: async () => {
        try{
            const grades = await Grade.findAll();
            return grades;
        }catch(error){
            throw error;
        }
    },

    getById: async (gradeId) => {
        try{
            const grade = await Grade.findByPk(gradeId);
            return grade;
        }catch(error){
            throw error;
        }
    },

    update: async (gradeId, updatedFields) => {
        try{
            const gradeUpdated = await Grade.update(updatedFields, {where: {gradeId}});
            return gradeUpdated[0];
        }catch(error){
            throw error;
        }
    },

    delete: async (gradeId) => {
        try{
            const gradeDeleted = await Grade.destroy({where: {gradeId}});
            return gradeDeleted;
        }catch(error){
            throw error;
        }
    }

}

export default gradeRepository;