const { Router } = require('express');
const archive = require('../data/archive.json');
const archiveMiddleware = require('../middleware/archive');

const router = Router();

router.post('/cancel', archiveMiddleware.single('cancel'), (req, res) => {
  try {
    if (req.body) {
      res.json({ answer: [
        ...archive.answer,
        ...req.body.answer.map(({
          id,     
          sum,
          qty,
          volume,
          name,
          delivery_date,
          currency
        }) => ({ id, status: 'archive', sum, qty, volume, name, delivery_date, currency }))] });
    }
  } catch (error) {
    console.error('SERVER:', error);
  } finally {
    res.json({ answer: 'fail' });
  }
});

module.exports = router;