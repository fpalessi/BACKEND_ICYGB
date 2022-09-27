const router = require("express").Router();

const { checkOut } = require("../controllers/paymentController");

router.post("/payment", checkOut);

module.exports = router;
