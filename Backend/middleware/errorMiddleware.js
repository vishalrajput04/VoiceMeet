export default function errorMiddleware(error, _req, res, _next) {
  console.error(error)
  if (error.code === 11000) return res.status(409).json({ message: 'That value is already in use' })
  return res
    .status(error.status || 500)
    .json({ message: error.status ? error.message : 'The server could not complete your request' })
}
