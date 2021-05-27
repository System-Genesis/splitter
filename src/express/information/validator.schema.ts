import * as Joi from 'joi';


// GET /api/forlders?name=test1
export const getInformationRequestSchema = Joi.object({
    query: {},
    body:{dataSource: Joi.string().required(),runUID: Joi.string().required(), personalNumber: Joi.string(),identityCard: Joi.string(), domainUser: Joi.string()  },
    params: {  },
});
