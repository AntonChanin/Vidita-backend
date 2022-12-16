const { Router } = require('express');
const archive = require('../data/archive.json');
const archiveMiddleware = require('../middleware/archive');

const router = Router();

router.post('/cancel', archiveMiddleware.single('cancel'), (req, res) => {
    try {
      if (req.file) {
        res.json({ answer: [...archive.answer, ...JSON.parse(req.file).answer] });
      }
    } catch (error) {
      console.error('SERVER:', error);
    }
});

module.exports = router;