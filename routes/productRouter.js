const router = require("express").Router();

router.route("/products").get().post();

router.route("/products/:id").delete().put();

module.exports = router;
