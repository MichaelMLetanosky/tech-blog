// const { route } = require("../../../.Main/controllers/api");

const router = require("express").Router();
const userRoutes = require('./userRoutes');

// Finish the required pathing for these variables
// const userRoutes = ;
// const postRoutes = ;
// const commentRoutes = ;

router.use("/user", userRoutes);
// write the rest of the router.use routes

module.exports = router;