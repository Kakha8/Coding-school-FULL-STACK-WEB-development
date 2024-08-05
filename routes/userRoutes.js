import express, { response } from 'express';
import path from 'path';
import UserModel from '../models/users.js';
import session from 'express-session'; // Import express-session
import bcrypt from 'bcrypt';
import pool from '../config/db.js';


const router = express.Router();

router.use(session({
    secret: 'your_secret_key', // Change this to a strong secret
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
  }));

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      return next(); // User is authenticated, proceed to next middleware/route
    }
    res.redirect('/login'); // User not authenticated, redirect to login
  };

router.get('/', (req, res) => {
    if (req.session.user) {
      res.redirect('/success'); // Redirect to success page if session exists
    } else {
      res.redirect('/login'); // Redirect to login page if no session
    }
  });

router.get('/login', (req, res) => {
    res.render('login', { error: null });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Authenticate the user using the hashed password
        const user = await UserModel.authenticate(username, password);

        if (user) {
            req.session.user = user;
            res.redirect('/success');
        } else {
            res.render('login', { error: 'Invalid username or password' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/yle', (req, res) => {

    res.status(200).json({message: `muteli`});
});

router.get('/users', async (req, res) => {
    try {
        const users = await UserModel.getAllUsers();
        
        if (users.length === 0) {
            res.status(404).send('No users found');
        } else {
            res.json(users); // Send the users as JSON
        }
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Internal Server Error');
    }
});

const formatDate = (date) => {
  return date ? new Date(date).toString() : 'N/A'; // Convert date to string or return 'N/A'
};

router.get('/success', isAuthenticated, async (req, res) => {
  let users = [];
  const isAdmin = req.session.user.username === 'Admin';

  try {
      if (isAdmin) {
          users = await UserModel.getAllUsers(); // Admin sees all users
      } else {
          users = await UserModel.getAllUsers(); // Non-admin users see all users or their own data, adjust as needed
      }
  } catch (err) {
      console.error('Error fetching users:', err);
      return res.status(500).send('Internal Server Error');
  }

  res.render('success', { 
      username: req.session.user.username,
      email: req.session.user.email,
      users,
      isAdmin 
  });
});

router.get('/register', (req, res) => {
  res.render('register');
});

// Route to handle registration form submission
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
      // Use hashedPassword instead of password
      const user = await UserModel.createUser(username, email, password);

      if (user) {
          req.session.user = user;
          res.render('registered'); // Render the "Successfully Registered" page
      } else {
          res.render('register', { error: 'Username or email already exists' });
      }
  } catch (err) {
      console.error('Error during registration:', err);
      res.status(500).send('Internal Server Error');
  }
});

  router.post('/delete/:username', isAuthenticated, async (req, res) => {
    const usernameToDelete = req.params.username;

    if (req.session.user.username !== 'Admin') {
        return res.status(403).send('Unauthorized');
    }

    try {
        await UserModel.deleteUser(usernameToDelete);
        res.redirect('/success'); // Redirect to success page after deletion
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).send('Internal Server Error');
    }
});
  
router.get('/update/:username/:field', isAuthenticated, (req, res) => {
  const { username, field } = req.params;
  if (req.session.user.username === 'Admin') {
      res.render('update', { username, field });
  } else {
      res.status(403).send('Forbidden');
  }
});

router.post('/update/:username/:field', isAuthenticated, async (req, res) => {
  if (req.session.user.username !== 'Admin') {
      return res.status(403).send('Forbidden');
  }

  const { newValue, adminPassword } = req.body;
  const { username, field } = req.params;

  try {
      // Verify admin password
      const admin = await UserModel.getUserByUsername(req.session.user.username);
      if (!admin) {
          return res.status(401).send('Admin not found');
      }

      const hashedAdminPassword = UserModel.hashPassword(adminPassword);
      
      const isPasswordCorrect = admin.password === hashedAdminPassword;

      if (!isPasswordCorrect) {
          return res.status(401).send('Invalid admin password');
      }

      // Update user details based on the field
      let updateQuery;
      if (field === 'username') {
          updateQuery = 'UPDATE users SET username = ? WHERE username = ?';
      } else if (field === 'email') {
          updateQuery = 'UPDATE users SET email = ? WHERE username = ?';
      } else if (field === 'password') {
          updateQuery = 'UPDATE users SET password = ? WHERE username = ?';
      } else {
          return res.status(400).send('Invalid field');
      }

      await pool.query(updateQuery, [newValue, username]);
      res.redirect('/success');
  } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).send('Internal Server Error');
  }
});


// Display edit page
router.get('/edit', isAuthenticated, async (req, res) => {
  const user = await UserModel.getUserByUsername(req.session.user.username);
  
  // Check if the user is admin
  const isAdmin = user.username === 'Admin';

  res.render('edit', { 
      username: req.session.user.username, 
      email: req.session.user.email,
      isAdmin,
      errors: [] 
  });
});

// Update username
router.post('/edit/username', isAuthenticated, async (req, res) => {
  const { newUsername, password } = req.body;
  const user = await UserModel.getUserByUsername(req.session.user.username);

  if (!user || user.password !== password) { // Check password
      return res.render('edit', { 
          username: req.session.user.username, 
          email: req.session.user.email,
          isAdmin: user.username === 'Admin',
          errors: ['Incorrect password.'] 
      });
  }

  if (user.username === 'Admin') {
      return res.render('edit', { 
          username: req.session.user.username, 
          email: req.session.user.email,
          isAdmin: true,
          errors: ['Admin username cannot be changed.'] 
      });
  }

  await UserModel.updateUserField(req.session.user.username, 'username', newUsername);
  req.session.user.username = newUsername;
  res.redirect('/success');
});

// Update email
router.post('/edit/email', isAuthenticated, async (req, res) => {
  const { newEmail, password } = req.body;
  const user = await UserModel.getUserByUsername(req.session.user.username);

  if (!user || user.password !== password) { // Check password
      return res.render('edit', { 
          username: req.session.user.username, 
          email: req.session.user.email,
          isAdmin: user.username === 'Admin',
          errors: ['Incorrect password.'] 
      });
  }

  await UserModel.updateUserField(req.session.user.username, 'email', newEmail);
  req.session.user.email = newEmail;
  res.redirect('/success');
});

// Update password
router.post('/edit/password', isAuthenticated, async (req, res) => {


  const { newPassword, confirmPassword, currentPassword } = req.body;
  const hashedPassword = UserModel.hashPassword(currentPassword);

  const user = await UserModel.getUserByUsername(req.session.user.username);

  if (!user || user.password !== hashedPassword) { // Check current password
      return res.render('edit', { 
          username: req.session.user.username, 
          email: req.session.user.email,
          isAdmin: user.username === 'Admin',
          errors: ['Incorrect current password.'] 
      });
  }

  if (newPassword !== confirmPassword) {
      return res.render('edit', { 
          username: req.session.user.username, 
          email: req.session.user.email,
          isAdmin: user.username === 'Admin',
          errors: ['New passwords do not match.'] 
      });
  }

  const hashedNewPassword = UserModel.hashPassword(newPassword);

  await UserModel.updateUserField(req.session.user.username, 'password', hashedNewPassword); // Save new password (not hashed)
  res.redirect('/success');
});

// Route to handle logout
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.redirect('/'); // Redirect to root page after logout
    });
  });

export default router;