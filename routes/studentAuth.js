const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const fetchAlumini = require("../middleware/fetchAlumini");

// -------------Create a Alumini using: POST "/api/Alumini/createAlumini". No login required
router.post("/createStudent",[
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("number", "number must be atleast 10 digits").isLength({min: 10}),
    body("college", "college must be atleast 5 characters").isLength({min: 5}),
    body("year", "Year must be a number with at least 2 characters").isLength({ min: 2 }),
    body("state", "state must be atleast 2 characters").isLength({min: 2}),
    body("branch", "state must be atleast 2 characters").isLength({min: 2}),
    body("company2", "state must be atleast 2 characters").isLength({min: 2}),
    body("password", "state must be atleast 5 characters").isLength({min: 5}),
  ],async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the Alumini with this email exists already
    try {
      let alumini = await Alumini.findOne({ email: req.body.email });
      if (alumini) {return res.status(400).json({ error: "Sorry a Alumini with this email already exists" })}
      // Create a new Alumini
      alumini = await Alumini.create({
        name: req.body.name,
        password: req.body.password, //secPass
        email: req.body.email,
        number: req.body.number,
        college: req.body.college,
        year: req.body.year,
        state: req.body.state,
        company1: req.body.company1,
        company2: req.body.company2,
      });
      const data = {
        Alumini: {
          id: alumini.id,
        },
      };
      const JWT_SECRET = "secret";
      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log(authtoken);
      success=true;
      res.json({success,authtoken})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
  }
);

// ----------authenticate a Alumini using: POST "/api/auth/login". No login required
router.post("/login",[
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let alumini = await Alumini.findOne({ email });
      if (!alumini) {
        success = false
        return res.status(400).json({ error: "no Alumini found" });
      }
      if (password !== alumini.password) {
        success = false;
        return res.status(400).json({ error: "Incorrect password" });
    }

      const data = {
        Alumini: {
          id: alumini.id,
        },
      };
      const JWT_SECRET = "secret";
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      console.log(authtoken);
      res.json({success,authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);

//-----------GET LOGEDIN Alumini DETAILS
router.post("/getAlumini",fetchAlumini, async (req, res) => {
  try {
    let aluminiid= req.Alumini.id;
    const alumini = await Alumini.findById(aluminiid)
    res.send(alumini)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});

module.exports = router;