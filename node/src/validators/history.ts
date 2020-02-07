import Joi from '@hapi/joi'
import { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const schema = Joi.object({
    query: Joi.object({
      from: Joi.date().less(Joi.ref('to')).required(),
      to: Joi.date().max('now').required()
    }).unknown(true)
  }).unknown(true)

  try {
    await schema.validateAsync(req)
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}
