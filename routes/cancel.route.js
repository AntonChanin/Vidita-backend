const { Router } = require('express');
const CircularJSON = require('circular-json');
const { writeFileSync } = require('fs');
const archive = require('../data/archive.json');
const archiveMiddleware = require('../middleware/archive');
const archivateCommodilityDto = require('../dto/archivateCommodilityDto');

const router = Router();

router.post('/cancel', archiveMiddleware.single('cancel'), (req, res) => {
  try {
    if (req.body) {
      const answer = [
        ...archive.answer,
        ...[archivateCommodilityDto(req.body)].flat(),
      ];
      const result = res.json({ answer });
      try {
        writeFileSync('data/archive.json', JSON.stringify(CircularJSON.stringify({ answer })), { encoding:'utf8',flag:'w' });
        console.log('Data successfully saved to disk');
      } catch (error) {
        console.log('An error has occurred ', error);
      }
      result;
    }
  } catch (error) {
    console.error('SERVER:', error);
  } finally {
    res.json({ answer: 'fail' });
  }
});

module.exports = router;