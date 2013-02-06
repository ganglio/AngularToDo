express = require 'express'
path = require 'path'

app = express()
public_folder = path.join __dirname, '..', 'public'
views_folder = path.join __dirname, '..', 'views'

app.get "/", (req, res) ->
	res.render "index.jade"

app.configure ->
	app.use express.methodOverride
	app.use express.bodyParser
	app.use express.static public_folder
	app.set "view engine", "jade"
	app.set 'views', views_folder
	app.use express.errorHandler
		dumpExceptions: true,
		showStack: true

	app.use app.router

console.log "Public folder: "+public_folder

app.listen 3000