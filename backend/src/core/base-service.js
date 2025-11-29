import ApiFeatures from './api-features.js';

export default class BaseService {
  constructor(Model) {
    this.Model = Model;
  }

  async getAll(
    queryString = {},
    extraWhere = {},
    defaultSort = [['createdAt', 'DESC']]
  ) {
    const features = new ApiFeatures(queryString, defaultSort)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .build();

    features.where = { ...features.where, ...extraWhere };

    const { rows, count } = await this.Model.findAndCountAll(features);

    return {
      data: rows,
      total: count,
      page: features.pagination?.page || 1,
      limit: features.pagination?.limit || rows.length,
    };
  }

  create(data) {
    return this.Model.create({ ...data });
  }

  update(instance, data) {
    return instance.update({ ...data });
  }

  remove(instance) {
    return instance.destroy();
  }
}
