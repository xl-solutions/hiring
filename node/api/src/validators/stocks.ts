import Joi from '@hapi/joi'
import { Request, Response, NextFunction } from 'express'

const validateAndRespond = async (schema: Joi.Schema, req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await schema.validateAsync(req)
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

const history = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const schema = Joi.object({
    query: Joi.object({
      from: Joi.date().less(Joi.ref('to')).required(),
      to: Joi.date().max('now').required()
    }).unknown(true)
  }).unknown(true)

  return validateAndRespond(schema, req, res, next)
}

const compare = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const schema = Joi.object({
    body: Joi.object({
      stocks: Joi.array().items(Joi.string()).min(1).max(4).required()
    }).unknown(true)
  }).unknown(true)

  return validateAndRespond(schema, req, res, next)
}

const gains = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const schema = Joi.object({
    query: Joi.object({
      purchasedAmount: Joi.number().positive().greater(0).required(),
      purchasedAt: Joi.date().max('now').required()
    }).unknown(true)
  }).unknown(true)

  return validateAndRespond(schema, req, res, next)
}

export {
  history,
  compare,
  gains
}
