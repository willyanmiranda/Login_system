exports.dashboardPage = (req, res) => {
    if (req.session.loggedin) {
      res.render('dashboard', { username: req.session.username });
    } else {
      res.redirect('/login');
    }
  };
  