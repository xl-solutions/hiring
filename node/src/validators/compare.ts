import Joi from '@hapi/joi'
import { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const schema = Joi.object({
    body: Joi.object({
      stocks: Joi.array().items(Joi.string()).min(1).max(4).required()
    }).unknown(true)
  }).unknown(true)

  try {
    await schema.validateAsync(req)
    next()
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}
