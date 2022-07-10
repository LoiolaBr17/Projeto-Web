'use strict';

/**
 * reserva-pet service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::reserva-pet.reserva-pet');
