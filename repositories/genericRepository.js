class GenericRepository {

    constructor(model) {
      this.model = model;
    }
  
    async getAll(options = {}) {
      try {
        const result = await this.model.findAll(options);
        return result;
      } catch (error) {
        throw error;
      }
    }
  }
  export default GenericRepository
  