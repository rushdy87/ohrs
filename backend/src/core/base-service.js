export default class BaseService {
  constructor(Model) {
    this.Model = Model;
  }

  getAll() {
    return this.Model.findAll();
  }

  create(data) {
    return this.Model.create(data);
  }

  update(instance, data) {
    return instance.update(data);
  }

  remove(instance) {
    return instance.destroy();
  }
}
