/**
 * GET /
 * Available page.
 */
exports.index = (req, res) => {
  const id = req.params.id
  res.render('detail_community', {
    title: `Community ${id}`
  })
}
