const graph = require('fbgraph')
const Community = require('../models/Community')

/**
 * GET /community
 * Community page.
 */
exports.index = (req, res) => {
  Community.find().sort({ created_at: 1 }).limit(10).exec((err, response) => {
    console.log("DEBUG response:", response)
    res.render('community', {
      title: 'Community',
      communities: response || []
    })
  })
}

/**
 * GET /community/import
 * Community page.
 */
exports.import = (req, res) => {
  const token = req.user.tokens.find(token => token.kind === 'facebook')
  graph.setAccessToken(token.accessToken)
  graph.get(`${req.user.facebook_id}/groups?fields=id,name,email,description,cover&limit=6`, (err, groups) => {
    res.render('community_import', {
      title: 'Import Community',
      groups: groups.data || []
    })
  })
}

/**
 * POST /community/import/:id
 * Community page.
 */
exports.do_import = (req, res) => {
  const id = req.params.id

  Community.findOne({ facebook_group_id: id }, (err, existingCommunity) => {
    if (existingCommunity) {
      req.flash('errors', { msg: `Group already imported as '${existingCommunity.name}' Community.` })
      return res.redirect('/community')
    }
    else {
      const token = req.user.tokens.find(token => token.kind === 'facebook')
      graph.setAccessToken(token.accessToken)
      graph.get(`${id}?fields=id,name,email,description,cover&limit=6`, (err, group) => {
        if (group) {
          const community = new Community()
          community.facebook_group_id = group.id
          community.name = group.name
          community.description = group.description
          community.created_by = req.user.facebook_id
          community.save()
        }

        return res.redirect('/community')
      })
    }
  })
}
