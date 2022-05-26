const router = require("express").Router();
const { getLastestTransactions } = require("../controllers/transaction");

router.post("/new", getLastestTransactions);

module.exports = router;
