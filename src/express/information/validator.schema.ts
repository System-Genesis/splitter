import * as Joi from 'joi';

// GET /api/forlders?name=test1
export const getInformationRequestSchema = Joi.object({
  query: {
    dataSource: Joi.alternatives().try(Joi.array(), Joi.string()).required(),
    personalNumber: Joi.string(),
    identityCard: Joi.string(),
    domainUser: Joi.string(),
  },
  body: {},
  headers: { runuid: Joi.string().required() },
  params: {},
}).options({ allowUnknown: true });
