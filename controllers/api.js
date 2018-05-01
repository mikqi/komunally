const request = require('request')
const cheerio = require('cheerio')
const graph = require('fbgraph')

/**
 * GET /api
 * List of API examples.
 */
exports.getApi = (req, res) => {
  res.render('api/index', {
    title: 'API Examples'
  })
}

/**
 * GET /api/facebook
 * Facebook API example.
 */
exports.getFacebook = (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === 'facebook')
  graph.setAccessToken(token.accessToken)
  graph.get(`${req.user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`, (err, profile) => {
    if (err) { return next(err) }
    res.render('api/facebook', {
      title: 'Facebook API',
      profile
    })
  })
}

/**
 * GET /api/scraping
 * Web scraping example using Cheerio library.
 */
exports.getScraping = (req, res, next) => {
  request.get('https://news.ycombinator.com/', (err, request, body) => {
    if (err) { return next(err) }
    const $ = cheerio.load(body)
    const links = []
    $('.title a[href^="http"], a[href^="https"]').each((index, element) => {
      links.push($(element))
    })
    res.render('api/scraping', {
      title: 'Web Scraping',
      links
    })
  })
}

/**
 * GET /api/upload
 * File Upload API example.
 */

exports.getFileUpload = (req, res) => {
  res.render('api/upload', {
    title: 'File Upload'
  })
}

exports.postFileUpload = (req, res) => {
  req.flash('success', { msg: 'File was uploaded successfully.' })
  res.redirect('/api/upload')
}
