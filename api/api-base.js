'use strict'
const pager = require('../helpers/paging')

const inflate = (flattened) => {
    let model = {};

    Object.getOwnPropertyNames(flattened).forEach(key => {
        const value = flattened[key]

        if (!value) {
            return;
        }

        let parts = key.split('-');
        let index = 0;
        let obj = model;

        for (const part of parts) {
            if (index === parts.length - 1) {
                obj[part] = value
            } else {
                obj[part] = obj[part] || {};
            }

            obj = obj[part];
            index++;
        }
    });

    return model;
}

module.exports = (serviceName, mapperName) => {
    let name = serviceName;
    mapperName = mapperName || name;
    const entityService = require('../services')[name];
    const entityMapper = require('../mappers')[mapperName];

    if (!entityService) {
        throw new Error(`services.${name} does not exist`);
    }

    if (!entityMapper) {
        throw new Error(`mappers.${mapperName} does not exist`);
    }

    return {
        get: async (req) => {
            if (!entityService.get) {
                throw new Error(`METHOD_NOT_SUPPORTED`);
            }
            let entity = await entityService.get(req.params.id);

            if (!entity) {
                return null;
            }
            return entityMapper.toModel(entity, req.context);
        },
        search: async (req) => {
            if (!entityService.search) {
                throw new Error(`METHOD_NOT_SUPPORTED`);
            }
            let page = pager.extract(req);

            let query = inflate(req.query);

            let combine;
            if (page) {
                combine = { 
                    ...query,
                    ...page 
                }
            }

            const entities = await entityService.search(query, page)

            let pagedItems = {
                items: entities.map(i => {
                    return (entityMapper.toSummary || entityMapper.toModel)(i)
                }),
                total: entities.count || entities.length
            }

            if (page) {
                pagedItems.offset = page.offset
                pagedItems.limit = page.limit
                pagedItems.pageNo = page.pageNo
            }

            return pagedItems
        },
        update: async (req) => {
            if (!entityService.update) {
                throw new Error(`METHOD_NOT_SUPPORTED`)
            }
            const entity = await entityService.update(req.params.id, req.body)
            return entityMapper.toModel(entity)
        },
        create: async (req) => {
            if (!entityService.create) {
                throw new Error(`METHOD_NOT_SUPPORTED`)
            }
            const entity = await entityService.create(req.body, req.user)
            return entityMapper.toModel(entity)
        },
        delete: async (req) => {
            if (!entityService.remove) {
                throw new Error(`METHOD_NOT_SUPPORTED`)
            }
            await entityService.remove(req.params.id)

            return `Item removed successfully`
        }
    }
}