const router = require('express').Router(); // import express router
const { User, Post, Comment } = require('../models'); // import models
const withAuth = require('../utils/auth'); // import withAuth middleware

router.get('/', async (req, res) => {
  // homepage route
  try {
    // try to get post data
    const postData = await Post.findAll({
      // find all posts
      include: [
        // include user model
        {
          model: User, // user model
          attributes: ['name'], // include name attribute
        },
      ],
      order: [
        ['id', 'DESC'], // order posts by id descending
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true })); // get post data

    res.render('homepage', {
      // render homepage.handlebars
      posts, // pass posts data
      logged_in: req.session.logged_in, // set logged_in to true
    });
  } catch (err) {
    // catch errors
    res.status(500).json(err); // return error
  }
});

router.get('/post/:id', async (req, res) => {
  // post route
  try {
    // try to get post data
    const postData = await Post.findByPk(req.params.id, {
      // find post by primary key
      include: [
        // include user and comment models
        {
          model: User, // user model
          attributes: ['name'], // include name attribute
        },
        {
          model: Comment, // comment model
          include: [
            // include user model
            {
              model: User, // user model
              attributes: ['name'], // include name attribute
            },
          ],
        },
      ],
    });

    const post = postData.get({ plain: true }); // get post data

    res.render('post', {
      // render post.handlebars
      ...post, // spread post data
      belongs_to_user: req.session.user_id === post.user_id, // set belongs_to_user to true if user_id matches
      logged_in: req.session.logged_in, // set logged_in to true
    });
  } catch (err) {
    // catch errors
    res.status(500).json(err); // return error
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  // edit post route
  try {
    // try to get post data
    const postData = await Post.findByPk(req.params.id, {
      // find post by primary key
      include: [
        // include user model
        {
          model: User, // user model
          attributes: ['name'], // include name attribute
        },
      ],
    });

    const post = postData.get({ plain: true }); // get post data

    res.render('edit', {
      // render edit.handlebars
      ...post, // spread post data
      logged_in: true, // set logged_in to true
    });
  } catch (err) {
    // catch errors
    res.status(500).json(err); // return error
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  // dashboard route
  try {
    // try to get user data
    const userData = await User.findByPk(req.session.user_id, {
      // find user by primary key
      attributes: { exclude: ['password'] }, // exclude password
      include: [{ model: Post }], // include post model
      order: [
        ['posts', 'id', 'DESC'], // order posts by id descending
      ],
    });

    const user = userData.get({ plain: true }); // get user data

    res.render('dashboard', {
      // render dashboard.handlebars
      ...user, // spread user data
      logged_in: true, // set logged_in to true
    });
  } catch (err) {
    // catch errors
    res.status(500).json(err); // return error
  }
});

router.get('/login', (req, res) => {
  // login route
  if (req.session.logged_in) {
    // if user is logged in, redirect to dashboard
    res.redirect('/dashboard'); // redirect to dashboard
    return; // return to prevent the rest of the code from running
  }

  res.render('login'); // render login.handlebars
});

router.get('/signup', (req, res) => {
  // signup route
  if (req.session.logged_in) {
    // if user is logged in, redirect to dashboard
    res.redirect('/dashboard'); // redirect to dashboard
    return; // return to prevent the rest of the code from running
  }

  res.render('signup'); // render signup.handlebars
});

router.get('/logout', (req, res) => {
  // logout route
  if (req.session.logged_in) {
    // if user is logged in
    req.session.destroy(() => {
      // destroy the session
      res.redirect('/'); // redirect to homepage
    });
  } else {
    // if user is not logged in
    res.redirect('/'); // redirect to homepage
  }
});

module.exports = router; // export router
