import { Response, Router, Request} from 'express'

const routes = Router()

const db = [
  'course-1',
  'course-2',
  'course-3'
]

routes.get('/courses', (req: Request, res: Response) => {
  return res.json({
    message: 'Hello there'
  })
})

routes.post('/courses', (req: Request, res: Response) => {
  const data = req.body.name
  db.push(data)
  return res.json({
    msg: 'insertion was a success!',
    db
  })
})

routes.get('/courses/:id', (req: Request, res: Response) => {
  const { id }  = req.params
  const selectedCourse = db[Number(id)]
  
  return res.json({
    course: selectedCourse
  })
})

export default routes