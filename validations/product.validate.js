import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string().required().min(3).max(255),
  price: Joi.number().required().min(0),
  description: Joi.string().min(3),
  thumbnail: Joi.string().min(3),
  images: Joi.array().items(Joi.string()),
  hide: Joi.boolean().default(false),
  category: Joi.string().min(3).max(255),
});

export default productSchema;
