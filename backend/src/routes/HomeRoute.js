import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const response = "Server Online";
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
  }
})

export default router;
