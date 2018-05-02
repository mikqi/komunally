/**
 * GET /
 * Available page.
 */
exports.index = (req, res) => {
  res.render('available', {
    title: 'Available'
  })
}
