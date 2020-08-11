const express = require('express');

const router = express.Router();

router.post('/prediction', (req, res) => {
  res.io.emit('prediction', req.body);
  res.send();
});

module.exports = router;
