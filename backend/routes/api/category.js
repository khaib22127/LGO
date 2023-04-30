const express = require("express");
const router = express.Router();
const { Spot, Category } = require("../../db/models");



//GET /api/categories
router.get("/", async (req, res) => {

  const allCategories = await Category.findAll();
  // let categorySpot = await Category.findAll({
  //     where
  // })

  res.json(allCategories);
});


// GET /api/categories/:categoryId
router.get("/:categoryId", async (req, res) => {
const categoryId = req.params.categoryId
    const spots = await Spot.findAll({
        where: {
            categoryId: categoryId
        }
    })
    // let categorySpot = await Category.findAll({
    //     where
    // })

    res.json({Category: spots})
})



module.exports = router;
