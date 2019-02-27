// modules
const express = require("express"),
  router = express.Router();

// models
const PizzaSizeOption = require("../../../models/pizza_options/PizzaSizeOption"),
  PizzaCrustOption = require("../../../models/pizza_options/PizzaCrustOption"),
  PizzaToppingOption = require("../../../models/pizza_options/PizzaToppingOption");

// validation
const validatePizzaSizeOption = require("../../../validation/pizza_options/pizza_size_option");
const validatePizzaCrustOption = require("../../../validation/pizza_options/pizza_crust_option");
const validatePizzaToppingOption = require("../../../validation/pizza_options/pizza_topping_option");

// utils
const normalize = require("../../../utils/normalize"),
  isEmpty = require("../../../utils/is-empty");

// @req         POST api/admin/manage_pizza_options/sizes
// @desc        create/edit pizza size options
// @access      admin only
// @req params  *size: (num)
//              *price: (num) -- e.g. base price
//              *add_price_per_topping: (num)
router.post("/sizes", (req, res) => {
  const { errors, isValid } = validatePizzaSizeOption(req.body);

  if (!isValid) return res.status(400).json(errors);

  const newSizeOption = {
    size: parseFloat(req.body.size),
    base_price: parseFloat(req.body.base_price),
    add_price_per_topping: parseFloat(req.body.add_price_per_topping)
  };

  PizzaSizeOption.findOne({ size: newSizeOption.size }).then(sizeOption => {
    if (sizeOption) {
      if (
        sizeOption.base_price !== newSizeOption.base_price ||
        sizeOption.add_price_per_topping !== newSizeOption.add_price_per_topping
      ) {
        PizzaSizeOption.updateOne(
          { size: newSizeOption.size },
          { $set: newSizeOption },
          { new: true }
        )
          .then(sizeOption => res.json(sizeOption))
          .catch(err => console.log(err));
      } else {
        errors.size = "Size already exists";
        return res.status(400).json(errors);
      }
    } else {
      new PizzaSizeOption(newSizeOption)
        .save()
        .then(sizeOption => res.json(sizeOption))
        .catch(err => res.json(err));
    }
  });
});

// @req         POST api/admin/manage_pizza_options/crusts
// @desc        create/edit pizza crusts options
// @access      admin only
// @req params  *name: (str) NORMAL
//              size_price_points: (MAP of num)
//                NOTE: if no additional price (i.e. input vals = 0),
//                  omit this field || send ""
//                NOTE: if add price && updating,
//                   MUST send with prices relative to ALL available sizes
router.post("/crusts", (req, res) => {
  const { errors, isValid } = validatePizzaCrustOption(req.body);

  if (!isValid) return res.status(400).json(errors);

  const newCrustOption = { name: normalize(req.body.name) };

  // if field = size_price_points is sent && not empty, undefined
  if (!isEmpty(req.body.size_price_points)) {
    newCrustOption.size_price_points = {};

    // convert req into array of arrays
    const extractedSPPs = req.body.size_price_points
      .split(",")
      .map(pp => pp.split(":"));

    // map converted req to new crust option obj
    extractedSPPs.forEach(
      pp => (newCrustOption.size_price_points[pp[0]] = parseFloat(pp[1]))
    );

    // compare new size keys to available sizes
    PizzaSizeOption.find()
      .then(sizeOptions => {
        // create array of available size values
        const availableSizes = sizeOptions
          .map(opt => opt.size.toString())
          .toString();

        if (
          availableSizes !==
          Object.keys(newCrustOption.size_price_points).toString()
        ) {
          errors.size_price_points =
            "[Route] Something's wrong with size point pricing";
          return res.status(400).json(errors);
        } else {
          updateCrustOptionInDB(newCrustOption);
        }
      })
      .catch(err => console.log(err));
  } else {
    updateCrustOptionInDB(newCrustOption);
  }

  function updateCrustOptionInDB(newCrustOption) {
    PizzaCrustOption.findOne({ name: newCrustOption.name }).then(
      crustOption => {
        if (crustOption) {
          if (!isEmpty(newCrustOption.size_price_points)) {
            // grab new size price points
            let newPrices = [];
            for (let pp in newCrustOption.size_price_points) {
              newPrices.push(newCrustOption.size_price_points[pp]);
            }

            // grab existing size point prices using .get()
            let existingPrices = [];
            Object.keys(newCrustOption.size_price_points).forEach(pp => {
              existingPrices.push(crustOption.get(`size_price_points.${pp}`));
            });

            // eval if prices at price points match
            if (existingPrices.toString() !== newPrices.toString()) {
              PizzaCrustOption.updateOne(
                { name: newCrustOption.name },
                { $set: newCrustOption },
                { new: true }
              )
                .then(crustOption => res.json(crustOption))
                .catch(err => console.log(err));
            } else {
              errors.name = "Crust option already exists";
              return res.status(400).json(errors);
            }
          } else {
            errors.name = "Crust option already exists";
            return res.status(400).json(errors);
          }
        } else {
          new PizzaCrustOption(newCrustOption)
            .save()
            .then(crustOption => res.json(crustOption))
            .catch(err => console.log(err));
        }
      }
    );
  }
});

// @req         POST api/admin/manage_pizza_options/toppings
// @desc        create/edit pizza topping options
// @access      admin only
// @req params  *name: (str) NORMAL
//              add_price: (num)

router.post("/toppings", (req, res) => {
  const { errors, isValid } = validatePizzaToppingOption(req.body);

  if (!isValid) return res.status(400).json(errors);

  const newToppingOption = { name: normalize(req.body.name) };

  if (req.body.add_price)
    newToppingOption.add_price = parseFloat(req.body.add_price);

  PizzaToppingOption.findOne({ name: newToppingOption.name }).then(topping => {
    if (topping) {
      if (
        newToppingOption.add_price &&
        topping.add_price !== newToppingOption.add_price
      ) {
        PizzaToppingOption.updateOne(
          { name: newToppingOption.name },
          { $set: newToppingOption },
          { new: true }
        )
          .then(topping => res.json(topping))
          .catch(err => console.log(err));
      } else {
        errors.name = "Topping option already exists";
        return res.status(400).json(errors);
      }
    } else {
      new PizzaToppingOption(newToppingOption)
        .save()
        .then(topping => res.json(topping))
        .catch(err => console.log(err));
    }
  });
});

module.exports = router;
