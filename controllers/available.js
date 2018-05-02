const graph = require('fbgraph')

/**
 * GET /
 * Available page.
 */
exports.index = (req, res) => {
  const token = req.user.tokens.find(token => token.kind === 'facebook')
  graph.setAccessToken(token.accessToken)
  graph.get(`${req.user.facebook_id}/groups?fields=id,name,email,description,cover&limit=4`, (err, groups) => {
    res.render('available', {
      title: 'Available',
      groups: groups ? groups.data : [1, 2, 3, 4]
    })
  })
}
