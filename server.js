const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var path = require('path');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
var db;
var localDB='mongodb://localhost:27017/exampleDb';
var cloudDB='mongodb://souvik:password@ds117271.mlab.com:17271/souvik'
MongoClient.connect(cloudDB, (err, database) => {
if (err) return console.log(err)
db = database
app.listen(process.env.PORT || 3000,() => {
console.log('listening on 3000')
})
})
app.get('/', (req, res) => {
db.collection('tasks').find().toArray((err, result) => {
if (err) return console.log(err)
res.render('index.ejs')
})
})
app.post('/tasks', (req, res) => {
var d = new Date();
var month=parseInt(d.getMonth())+1;
req.body.sdate=d.getDate()+"-"+month+"-"+d.getFullYear();
db.collection('tasks').save(req.body, (err, result) => {
if (err) return console.log(err)
console.log('saved to database')
res.send(result)
})
})
app.delete('/tasks', (req, res) => {
db.collection('tasks').findOneAndDelete({key: req.body.key},
(err, result) => {
if (err) return res.send(500, err)
res.send(result)
})
})
app.get('/getTasks', (req, res) => {
db.collection('tasks').find().toArray((err, result) => {
if (err) return console.log(err)
res.send(result)
})
})

app.get('/getCompletedTasks', (req, res) => {
db.collection('completedTask').find().toArray((err, result) => {
if (err) return console.log(err)
res.send(result)
})
})

app.post('/completedTasks', (req, res) => {
	
	db.collection('tasks').findOneAndDelete({key: req.body.oldKey},
(err, result) => {
if (err)  {return res.send(500, err) }
var d = new Date();
var month=parseInt(d.getMonth())+1;
req.body.completedDate=d.getDate()+"-"+month+"-"+d.getFullYear();
db.collection('completedTask').save(req.body, (err, result) => {
if (err) return console.log(err)
console.log('saved to Completed Tasks database')
res.send(result)
})
})
})
app.delete('/completedTasks', (req, res) => {
db.collection('completedTask').findOneAndDelete({key: req.body.key},
(err, result) => {
if (err) return res.send(500, err)
res.send(result)
})
})
