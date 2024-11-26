const express = require('express');
const router = express();

router.use("/api/users", require('./userRoutes'));
router.use("/api/photos", require('./photoRoutes'));

router.get('/', (req, res)=>{
  res.send('API Working');
})

module.exports = router;