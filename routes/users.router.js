const express = require("express");

const router = express.Router();

// Query parameters
router.get('/',(req, res) =>{
  const {limit, offset} = req.query;
  if (limit && offset){
    res.json({
      limit,
      offset
    })
  } else {
    res.send("No hay parametros enviados")
  }
}
)


module.exports = router;
