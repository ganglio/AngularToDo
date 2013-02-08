express = require 'express'
http = require 'http'
sqlite3 = require 'sqlite3'

path = require 'path'
app = express()
public_folder = path.join __dirname, '..', 'public'
views_folder = path.join __dirname, '..', 'views'
db_file = path.join(__dirname, '..', 'test.db')

db = new sqlite3.Database(db_file)

app.configure ->
	app.set 'port', 3000
	app.set 'views', views_folder
	app.set 'view engine', 'jade'
	app.use express.favicon()
	app.use express.logger 'dev'
	app.use require("connect").bodyParser()
	app.use express.methodOverride()
	app.use express.cookieParser '652626bvhfdhghy52h5g'
	app.use express.session()
	app.use express.static public_folder
	app.use app.router

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
		res.send rows

app.post '/data/:id', (req, res) ->
	id = req.params['id']
	db.run "INSERT INTO entries VALUES (?,?,?)", eq.body.id, req.body.name, req.body.success
	res.send req.body

app.put '/data/:id', (req, res) ->
	id = req.params['id']
	db.run "UPDATE entries SET success=? WHERE id=?", req.body.success, id
	res.send req.body

app.get '/data/:id', (req, res) ->
	id = req.params['id']
	res.send entries[id]

console?.log 'Public folder: ' + public_folder
console?.log 'DB file: ' + db_file

http.createServer(app).listen app.get('port'), ->
	console.log "Express server listening on port " + app.get 'port';