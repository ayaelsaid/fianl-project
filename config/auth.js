function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'You need to log in to access this page.');
    res.redirect('/login');
}
module.exports = ensureAuthenticated;
