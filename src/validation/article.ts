import { Joi } from 'express-validation';
// eslint-disable-next-line  @typescript-eslint/no-unsafe-member-access
export const article :any={
  addArticle:{
    body: Joi.object({
      nickname:Joi.string().required(),
      title:Joi.string().required(),
      content:Joi.string().required(),
    }),
  },
  getOneArticle:{
    params:Joi.object({
      id:Joi.number().required(),
    }),
  },
};