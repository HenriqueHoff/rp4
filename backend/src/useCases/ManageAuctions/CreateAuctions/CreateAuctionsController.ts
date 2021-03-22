import { Request, Response } from 'express'
import createAuctionsUseCase from './CreateAuctionsUseCase'

class CreateAuctionsController {
  handle (request: Request, response: Response) {
    const start: Date = request.body.datetime
    const id: string = request.body.id
    const items: string[] = request.body.items

    createAuctionsUseCase.execute({ start, id, items })
      .then(() => {
        return response.status(201).send()
      })
      .catch((error) => {
        return response.status(400).json({
          message: error.message || 'Unexpected error'
        })
      })
  }
}

export default new CreateAuctionsController()
