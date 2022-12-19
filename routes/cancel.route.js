const { Router } = require('express');
const archive = require('../data/archive.json');
const archiveMiddleware = require('../middleware/archive');
const archivateCommodilityDto = require('../dto/archivateCommodilityDto');

const router = Router();

router.post('/cancel', archiveMiddleware.single('cancel'), (req, res) => {
  try {
    if (req.body) {
      res.json({
        answer: [
          ...archive.answer,
          ...archivateCommodilityDto(req.body),
        ]
      });
    }
  } catch (error) {
    console.error('SERVER:', error);
  } finally {
    res.json({ answer: 'fail' });
  }
});

module.exports = router;