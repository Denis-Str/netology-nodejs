const express = require('express');
const router = express.Router();
router.post('/api/user/login', (req, res) => {
  const data = {id: 1, mail: "test@mail.ru"};
  res.status(201);
  res.json(data);
});

module.exports = router;