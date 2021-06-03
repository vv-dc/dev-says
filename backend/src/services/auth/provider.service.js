'use strict';

const { PgApi } = require('../pg/pg.service');

class ProviderService {
  constructor() {
    this.providerTable = 'AuthProviders';
    this.authTable = 'Auths';
    this.pg = new PgApi();
  }

  async findProvider(authProvider) {
    return this.pg.findOne({
      fields: ['providerId'],
      table: this.providerTable,
      where: { providerName: authProvider },
    });
  }

  async findAuth(userId, authProvider) {
    const { providerId: authProviderId } = await this.findProvider(
      authProvider
    );
    return this.pg.findOne({
      table: this.authTable,
      where: { userId, authProviderId },
    });
  }

  async addAuth({ userId, password, authProvider }) {
    const { providerId: authProviderId } = await this.findProvider(
      authProvider
    );
    return this.pg.insert({
      items: [{ userId, authProviderId, password }],
      table: this.authTable,
    });
  }
}

module.exports = { ProviderService };
