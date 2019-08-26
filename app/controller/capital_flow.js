'use strict';

const Controller = require('egg').Controller;

class CapitalFlow extends Controller {

  async index() {
    const { ctx, service } = this;
    try {
      ctx.validate({
        pageNo: { type: 'int?', convertType: 'int', default: 0 },
        pageSize: { type: 'int?', convertType: 'int', default: Number.MAX_SAFE_INTEGER - 1 },
        startDate: { type: 'int?', convertType: 'int', default: 0 },
        endDate: { type: 'int?', convertType: 'int', default: Number.MAX_SAFE_INTEGER },
      }, ctx.query);
    } catch (_) {
      ctx.print = { errorCode: 422 };
      return;
    }

    const {
      pageNo,
      pageSize,
      startDate,
      endDate,
      typeNameId,
      type
    } = ctx.query;

    try {
      const result = await service.capitalFlow.findAndCountAllByUid({
        offset: pageNo * pageSize,
        limit: pageSize,
        startDate,
        endDate,
        typeNameId,
        type
      });
      ctx.print = result;
    } catch (_) {
      ctx.print = { errorCode: 2 };
    }
  }

  async create() {
    const { ctx, service } = this;

    try {
      ctx.validate({
        date: { type: 'int' },
        typeId: { type: 'string' },
        price: { type: 'number' },
        remarks: { type: 'string?', min: 0, max: 250 },
      });
    } catch (_) {
      ctx.print = { errorCode: 422 };
      return;
    }

    const { date, typeId, price, remarks } = ctx.request.body;
    
    try {
      const result = await service.capitalFlow.create({ date, typeId, price, remarks });
      ctx.print = result;
    } catch (_) {
      ctx.print = { errorCode: 3, msg: '创建失败' };
    }
  }

  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;

    const result = await service.capitalFlow.deleteById(id);
    ctx.print = { ...result, msg: '删除成功' };
  }

  async update() {
    const { ctx, service } = this;
    const id = ctx.params.id;

    try {
      ctx.validate({
        date: { type: 'int' },
        typeId: { type: 'string' },
        price: { type: 'number' },
        remarks: { type: 'string?', min: 0, max: 250 },
      });
    } catch (_) {
      ctx.print = { errorCode: 422 };
      return;
    }

    const { date, typeId, price, remarks } = ctx.request.body;
    
    try {
      const result = await service.capitalFlow.updateById(id, { date, typeId, price, remarks });
      ctx.print = result;
    } catch (_) {
      ctx.print = { errorCode: 5, msg: '更新失败' };
    }
  }

  // 统计金额
  async sumPrice() {
    const { ctx, service } = this;
    const { startDate, endDate } = ctx.query;

    try {
      const result = await service.capitalFlow.findSumPriceByDate(startDate, endDate);
      ctx.print = result;
    } catch (_) {
      ctx.print = { errorCode: 2 };
    }
  }
}

module.exports = CapitalFlow;
