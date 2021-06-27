const express = require('express');
const router = express.Router();
const personHandler = require('../handler/person');
const personController = require('../controller/person');

router.get("/", personController.index );

// get : baseUrl/person/search?q=<query> => name/address/age
router.get("/search", personController.search );

router.get("/:id", personController.findById );

router.post("/", personController.create );

router.delete("/:id", personController.remove );

module.exports = router
