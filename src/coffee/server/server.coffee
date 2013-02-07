express = require 'express'
sqlite3 = require 'sqlite3'

path = require 'path'
app = express()
public_folder = path.join __dirname, '..', 'public'
views_folder = path.join __dirname, '..', 'views'
db_file = path.join(__dirname, '..', 'test.db')

db = new sqlite3.Database(db_file)

app.get '/', (req, res) ->
	res.render 'index.jade'
		locals:
			app_name: ''

app.get '/module', (req, res) ->
	res.render 'module.jade'
		locals:
			app_name: 'moduleDemo'

app.get '/data', (req, res) ->
	db.all 'SELECT * FROM entries', {}, (err,rows) ->
		console?.log(rows)
		res.send rows

app.put '/data/:id', (req, res, stuff) ->
	id = req.params['id']
	console.log(stuff)

app.get '/data/:id', (req, res) ->
	id = req.params['id']
	res.send entries[id]

app.configure ->
	app.use express.methodOverride()
	app.use express.bodyParser()
	app.use express.static public_folder
	app.set 'view engine', 'jade'
	app.set 'views', views_folder
	app.use express.errorHandler
		dumpExceptions: true,
		showStack: true
	app.use app.router

console?.log 'Public folder: ' + public_folder
console?.log 'DB file: ' + db_file

app.listen 3000