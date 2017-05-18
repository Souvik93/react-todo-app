const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var path = require('path');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
//app.use('/scripts', express.static(__dirname+'/node_modules/'));
//app.use(express.static('views'))
app.use("/views", express.static(__dirname + "/views"));
app.use("/public", express.static(__dirname + "/public"));
app.use("/node_modules/", express.static(__dirname + "/node_modules/"));
var db;
var localDB='mongodb://localhost:27017/exampleDb';
var cloudDB='mongodb://souvik:password@ds117271.mlab.com:17271/souvik'
var userName;
MongoClient.connect(cloudDB, (err, database) => {
if (err) return console.log(err)
db = database
app.listen(process.env.PORT || 3000,() => {
console.log('listening on 3000')
})
})
app.get('/', (req, res) => {
res.render('home.ejs')
})

app.get('/registraionPage', (req, res) => {
res.render('registration.ejs')
})


app.get('/getUserName', (req, res) => {
	var response2={};
	response2.username=userName;
res.send(response2);
})

app.get('/logOut', (req, res) => {
	userName="";
	//response2.username=userName;
	
	//localStorage.removeItem("");
	
res.render('File.ejs')
})

app.post('/logIn', (req, res) => {
	console.log(req.body.username);
	db.collection('login').findOne({uName: req.body.username,reg_password:req.body.password},
(err, result) => {
if (err) return res.send(500, err)
console.log(result)
if(result==null)
	{
		res.render('File.ejs')
	}
else{
	userName=result.username;
	console.log(userName);
	res.render('index.ejs')
}		
})
})

app.post('/registration', (req, res) => {
	//console.log(req.body.username);
	var flag="";
	db.collection('login').findOne({uName: req.body.username},
								  (err,result)=>{
		if(err) return res.send(500,err)
		flag=result;
	})
	
	if(flag!=null)
		{
			let op={};
			op.status="Sorry.....Username Already Used, Please Choose Different One....";
			console.log("Username Already Used");
			res.send(op)
		}
	else
		{
			
			db.collection('login').save(req.body,
(err, result) => {
if (err) return res.send(500, err)
console.log(result)
if(result==null)
	{
		res.render('File.ejs')
	}
else{
	//userName=result.username;
	//console.log(userName);
	res.render('home.ejs')
}		
})		
		}
})




app.post('/tasks', (req, res) => {
var d = new Date();
	//console.log(req.body.deadline)
var month=parseInt(d.getMonth())+1;
req.body.sdate=d.getFullYear()+"-"+month+"-"+d.getDate();
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
app.get('/getTasks/:uName', (req, res) => {
	console.log(req.params.uName);
db.collection('tasks').find({username:req.params.uName}).toArray((err, result) => {
if (err) return console.log(err)

console.log(result);
res.send(result)
})
})

app.get('/getCompletedTasks/', (req, res) => {
	//console.log(req.query.uName);
db.collection('completedTask').find({username:req.query.uName}).toArray((err, result) => {
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
req.body.completedDate=d.getFullYear()+"-"+month+"-"+d.getDate();
db.collection('completedTask').save(req.body, (err, result) => {
if (err) return console.log(err)
console.log('saved to Completed Tasks database')
res.send(result)
})
})
})
app.delete('/completedTasks', (req, res) => {
db.collection('completedTask').findOneAndDelete({key:req.body.key},
(err, result) => {
if (err) return res.send(500, err)
res.send(result)
})
})
app.delete('/deleteAllCompletedTasks', (req, res) => {
db.collection('completedTask').remove({},
(err, result) => {
if (err) return res.send(500, err)
res.send(result)
})
})
app.delete('/deleteAllTasks', (req, res) => {
db.collection('tasks').remove({},
(err, result) => {
if (err) return res.send(500, err)
console.log(result);
res.send(result)
})
})

app.get('*', (req, res) => {
  res.render('File.ejs');
});
