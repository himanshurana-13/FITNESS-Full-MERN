const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({username})

    if (existingUser) {
        return res.status(402).json({
            success: false,
            message: "User already Exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword });
    try {
    await user.save();
    // res.status(201).send('User registered');
    return res.status(201).json({
        success: true,
        message: "User registered"
    });
    } catch (err) {
    // res.status(500).send('Error registering user');
    return res.status(500).json({
        success: false,
        message: err.message
    });
    }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
    //   return res.status(400).send('Invalid username or password');
        return res.status(400).json({
            success: false,
            message: "Invalid username or password"
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
    //   return res.status(400).send('Invalid username or password');
    return res.status(400).json({
        success: false,
        message: "Invalid username or password"
    });
    }
    // res.status(200).send('Login successful');
    return res.status(200).json({
        success: true,
        message: "Login Successfull"
    });
  } catch (err) {
    // res.status(500).send('Error logging in');
    return res.status(500).json({
        success: false,
        message: err.message
    });
  }
});

module.exports = router;









// const express = require('express');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');
// const router = express.Router();

// // Register
// router.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // Check if user with given email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).send("Email already exists");
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).send('User registered successfully');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error registering user');
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).send("Invalid email or password");
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).send("Invalid email or password");
//     }

//     // Successful login
//     res.status(200).send('Login successful');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error logging in');
//   }
// });

// module.exports = router;








// const express = require('express');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');
// const router = express.Router();

// // Register
// router.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // Check if user with given email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).send("Email already exists");
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).send('User registered successfully');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error registering user');
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).send("Invalid email or password");
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).send("Invalid email or password");
//     }

//     // Successful login
//     res.status(200).send('Login successful');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error logging in');
//   }
// });

// module.exports = router;














