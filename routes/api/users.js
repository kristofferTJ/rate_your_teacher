const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');


const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Pulic
router.post(
  '/',
  [
    //check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Passordet må være minst 6 karakterer langt'
    ).isLength({
      min: 6,
    }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body; //Fjernet name herfra

    // See if user exists
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Brukeren eksisterer allerede ' }] });
      }

      // Get users gravatar

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      //Fjernet name herfra
      user = new User({
        email,
        avatar,
        password,
      });

      // Encrypt password

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send(`Server error`);
    }
  }
);
module.exports = router;
