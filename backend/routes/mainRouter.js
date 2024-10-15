const express = require("express");
const userRouter = require("./userRoutes");
const listingRouter = require("./listingRoutes");
const adminRouter = require("./adminRoutes");
const trainerRouter = require("./trainerRoutes");
const reviewRouter = require("./reviewRoutes");
const router = express.Router();
const orgRouter = require("./organizationRoutes")
const orderRouter = require("./orderRouter")

router.use("/user", userRouter);
router.use("/", trainerRouter);
router.use("/listing", listingRouter);
router.use("/admin", adminRouter);
router.use("/review", reviewRouter);
router.use("/", orgRouter);
router.use("/order", orderRouter);


module.exports = router;
