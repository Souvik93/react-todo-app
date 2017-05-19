var ToDoForm = React.createClass({ 
	   componentWillMount: function() {
	   
	   if(localStorage.getItem("username")==null)
	   window.location="/";
	   this.setState({
      uName: localStorage.getItem("username")
       });
      this.getTasks();
	  
   },
      getInitialState:function() {
         return {
           task: [],
        result:"Hi",
        taskDetails:[],
		CtaskDetails:[],
		uName:""
         };
       },
      
      addTasks: function(e){
      	var smpl=this.state.task;
		var loadScreen = document.getElementById('imgR');
		var element = document.getElementById('sec');
		var Belement = document.getElementById('asec')
		element.style.display="none";
		loadScreen.style.display="block";
		Belement.style.display="none";
      	smpl.push({text: this._inputElement.value,
           key: Date.now(),
		   deadline: this.deadline.value});
        fetch('tasks', {
         method: 'post',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
           'text': this._inputElement.value,
           'key': Date.now(),
		   'deadline':this.deadline.value,
		   'username':this.state.uName
         })
       })
       .then(response => {
         if (response.ok) return response.json()
       })
       .then(data => {
		loadScreen.style.display="none";
	    var element = document.getElementById('id');
  element.style.display = "block";
	   
       this.setState({
      result: "Data Inserted Succesfully"
       });
	   setTimeout(function() {
    element.style.display = "none";
  }, 5000);
  this.getTasks();
       })
      	
       this.setState({
         task: smpl
       });
      	this._inputElement.value = "";		
      },
      
      getTasks: function(e){
      var url="getTasks/"+localStorage.getItem("username");
      fetch(url, {
         method: 'get',
         headers: {'Content-Type': 'application/json'},
       })
       .then(response => {
         if (response.ok) return response.json()
       })
       .then(data => {
	   //console.log(data.length);
	   this.CgetTasks();
	   var element = document.getElementById('sec');
	   var Belement = document.getElementById('asec');
	   if(data.length==0){
	   element.style.display="none";
	   Belement.style.display="block"
	   }
	   else{
	   element.style.display="block";
	   Belement.style.display="none"
	   this.setState({
      taskDetails: data
       });
	   }
       })
      
      },
	  
	   CgetTasks: function(e){
	   
      var url="getCompletedTasks/?uName="+localStorage.getItem("username");
      fetch(url, {
         method: 'get',
         headers: {'Content-Type': 'application/json'},
       })
       .then(response => {
         if (response.ok) return response.json()
       })
       .then(data => {
	   console.log('From get complete tasks method');
	   var element = document.getElementById('csec');
	   var Belement = document.getElementById('acsec');
	   if(data.length==0) {
	   element.style.display="none";
	   Belement.style.display="block"
	   }
	   else{
	   element.style.display="block";
	   Belement.style.display="none";
	   this.setState({
      CtaskDetails: data
       });
	   }
       })
      
      },
	  logOut: function(e)
	  {
	  localStorage.clear();
	  localStorage.removeItem("username");
	   window.location="/logOut";
	  },
	 
      render: function() {
      return (
      	<div>
      	<div className="col-md-9 col-xs-12">
      	<form>
      	<div className="form-group">
      	<h4>{this.state.uName},What needs to be done?</h4> <a onClick={this.logOut}>LogOut</a>
             <input type="text" ref={(a) => this._inputElement = a} className="form-control" placeholder="ex- buy new smartphone for friend" name="uname">
                   </input>
      		  </div>
			  
		<div className="form-group">
      	<h4>Due Date</h4>
             <input type="date" ref={(b) => this.deadline = b} className="form-control" name="pwd" >
                   </input>
      		  </div>
      		  
      		  <button type="button" className= "btn btn-success" onClick={this.addTasks}>Add Now</button>
      	</form>
      	</div>
		<div className="col-md-3 col-xs-12">
	
		<div style={{display: 'none'}} id='id' className="alert alert-success"> <h6>{this.state.result}</h6></div>
	   </div>
      		<div className="col-md-6 col-xs-12">
      	   <ToDoList tasks={this.state.taskDetails} getTasks={this.getTasks}> </ToDoList>
      	   </div>
		   
		   <div className="col-md-6 col-xs-12">
      	   <ToDoCList Ctasks={this.state.CtaskDetails} cGetTasks={this.CgetTasks}> </ToDoCList>
      	   </div>
      	</div>
         );
       }
      });
      
      var ToDoList=React.createClass({       
       
	   deleteTasks: function(e){
       //console.log(e);
      fetch('tasks', {
         method: 'delete',
         headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
           'key': e
         })
       })
       .then(response => {
         if (response.ok) return response.json()
       })
       .then(data => {
	    this.props.getTasks();
       })
      
      },
	  
	  deleteAllTasks: function(e){
       //console.log(e);
	   var loadScreen = document.getElementById('imgR');
		var element = document.getElementById('sec');
		var Belement = document.getElementById('asec')
		element.style.display="none";
		loadScreen.style.display="block";
		//Belement.style.display="none";
      fetch('deleteAllTasks', {
         method: 'delete',
         headers: {'Content-Type': 'application/json'}
       })
       .then(response => {
         if (response.ok) return response.json()
       })
       .then(data => {
	   Belement.style.display="block";
		loadScreen.style.display="none";
       //alert("task deleted");
       //console.log(this.state.taskDetails)
	    this.props.getTasks();
       })
      
      },
	  
	  completeTasks: function(okey,text,sdate,deadlineDate){
	  
	  var loadScreen = document.getElementById('loaderForCompleteTask');
		var element = document.getElementById('csec');
		var Belement = document.getElementById('acsec')
		element.style.display="none";
		loadScreen.style.display="block";
		Belement.style.display="none";
	  fetch('completedTasks', {
         method: 'post',
         headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
	  		'key':Date.now(),
           'oldKey': okey,
		   'text':text,
		   'sdate': sdate,
		   'deadline':deadlineDate,
		   'username':localStorage.getItem("username")
         })
       })
       .then(response => {
         if (response.ok) return response.json()
       })
       .then(data => {
       //alert("task deleted");
       //console.log(this.state.taskDetails)
	   element.style.display="block";
		loadScreen.style.display="none";
	   this.props.getTasks();
       })
	  
	  },
      render: function(){
      		  var todoEntries = this.props.tasks;
      		function createTasks(item) {
           return <li key={item.key}>{item.text}</li>
         }
      	var listItems = todoEntries.map(createTasks);
      	return(
      		<div>
      	<h4>Check Your To-Do List</h4>
		<hr className="type_5"></hr>
      		<section className="todo" id='sec'>
			<ul className="todo-controls  ">
		<li>
	   <a className="red-anchor" href="#" onClick={this.deleteAllTasks}>Delete All</a>
	   </li>
	   </ul>
      		<ul className="todo-list">
      		{this.props.tasks.map((key) =>
      		<li className="done" key={key.key} >
      		<h6><strong>{key.text} </strong></h6>
			<h6><strong className="deadline-date">Due Date <small className="deadline-date">: {key.deadline} </small> </strong><strong className="fload-right"> Creation Date<small>: {key.sdate} </small></strong></h6>
      		<a className="glyphicon glyphicon-ok-circle" title="Done" onClick={this.completeTasks.bind(this,key.key,key.text,key.sdate,key.deadline)}></a>
      		<a className="glyphicon glyphicon-remove-circle" onClick={this.deleteTasks.bind(this,key.key)} title="Delete it"></a> 
        </li> )}
        </ul>
      		</section>
			<div className="loader" id="imgR" style={{display:'none'}} >Loading.....</div>
			<div className="alert alert-warning alert-dismissable" id="asec" style={{display:'none'}}>
    <a href="#" className="close" data-dismiss="alert" aria-label="close">×</a>
    <strong>Warning!</strong> You have not added anything..
  </div>
      		</div>
      );
      }
      });
	  
	   var ToDoCList=React.createClass({
	   
	   
       deleteCompletedTasks: function(e){
      fetch('completedTasks', {
         method: 'delete',
         headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
           'key': e
         })
       })
       .then(response => {
         if (response.ok) return response.json()
       })
       .then(data => {
       //alert("task deleted");
       //console.log(this.state.taskDetails)
	   this.props.cGetTasks();
       })
      
      },
	  deleteAllCompletedTasks: function(e){
	  var loadScreen = document.getElementById('loaderForCompleteTask');
		var element = document.getElementById('csec');
		var Belement = document.getElementById('acsec')
		element.style.display="none";
		loadScreen.style.display="block";
		
      fetch('deleteAllCompletedTasks', {
         method: 'delete',
         headers: {'Content-Type': 'application/json'}
       })
       .then(response => {
         if (response.ok) return response.json()
       })
       .then(data => {
	   Belement.style.display="block"
		loadScreen.style.display="none";
	   this.props.cGetTasks();
       })
      
      },
      render: function(){
      		  var todoEntries = this.props.Ctasks;
      		function createTasks(item) {
           return <li key={item.key}>{item.text}</li>
         }
      	var listItems = todoEntries.map(createTasks);
      	return(
      		<div>
      	<h4>Check Your Completed Tasks</h4>
		<hr className="type_5"></hr>
		<section className="todo" id="csec">
		<ul className="todo-controls  ">
		<li>
	   <a className="red-anchor" href="#" onClick={this.deleteAllCompletedTasks}>Delete All</a>
	   </li>
	   </ul>
      		<ul className="todo-list">
      		{this.props.Ctasks.map((key) =>
      		<li className="done" key={key.key} >
      		<h5><strong><del>{key.text}</del></strong></h5>
			<h6><strong className="complete-date">Completed Date:{key.completedDate}</strong><strong className="deadline-date fload-right">Due Date : {key.deadline} <a className="glyphicon glyphicon-remove" onClick={this.deleteCompletedTasks.bind(this,key.key)} title="Delete it"></a></strong>  </h6>
        </li> )}
        </ul>
      		</section>
			<div className="loader2" id="loaderForCompleteTask" style={{display:'none'}} >Loading.....</div>
			
			<div className="alert alert-info alert-dismissable" id="acsec" style={{display:'none'}}>
    <a href="#" className="close" data-dismiss="alert" aria-label="close">×</a>
    <strong>Warning!</strong> Nothing to show here..
  </div>	
      		</div>
      );
      }
      });
      ReactDOM.render(<ToDoForm />, document.getElementById('reactContainer'));