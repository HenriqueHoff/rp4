import { v4 as uuidv4 } from 'uuid'
import { NextFunction, Request, Response } from 'express'

const generateIDMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.path.includes('create')) {
    req.body.id = uuidv4()
  }
  next()
}

export default generateIDMiddleware
