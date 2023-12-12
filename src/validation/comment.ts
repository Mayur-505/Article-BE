import { Joi } from 'express-validation';

export const comment :any={
  addComment:{
    body: Joi.object({
      article_id:Joi.number().required(),
      parent_id:Joi.number(),
      nickname:Joi.string().required(),
      content:Joi.string().required(),
    }),
  },
  getCommentsForArticle:{
    params:Joi.object({
      id:Joi.number().required(),
    }),
  },
};