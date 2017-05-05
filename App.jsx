var ToDoForm = React.createClass({  
	
	getInitialState:function() {
    return {
      task: []
    };
  },
	
	addTasks: function(e){
		//console.log(this._inputElement.value);
		var smpl=this.state.task;
		smpl.push({text: this._inputElement.value,
      key: Date.now()});
		
		
		this.setState({
    task: smpl
  });
		this._inputElement.value = "";
		//console.log(this.state.task);
		
	},
	
	render: function() {
    return (
		<div>
		<form>
        <input type="text" ref={(a) => this._inputElement = a}>
              </input>
		<br></br>
		<button type="button" onClick={this.addTasks}>Add Now</button>
		</form>
		   <ToDoList tasks={this.state.task}>
								 
		</ToDoList>
		</div>
    );
  }
});

var ToDoList=React.createClass({
	render: function(){
				console.log(this.props.tasks);
			  var todoEntries = this.props.tasks;
			function createTasks(item) {
      return <li key={item.key}>{item.text}</li>
    }
		var listItems = todoEntries.map(createTasks);
		return(
			<div>
		<h4>Hello From To Do List</h4>
			{this.props.tasks.map((key) =>
  <p key={key.key}>{key.text}</p>
)}
			
			</div>
);
	}
});


ReactDOM.render(<ToDoForm />, document.getElementById('reactContainer'));  





/*
var Book = React.createClass({  
  	getInitialState:function() {
    return {
      read: false
    };
  },
	handleChange: function(ev)
	{
		console.log(this.state.read);
		 this.state.read = !this.state.read;
		console.log(this.state.read);
	},
	propTypes: {
    title: React.PropTypes.string.isRequired
  },
	render: function() {
    return (
      <tr>
        <td>{this.props.title}</td>
		 <td><input type='checkbox' onChange={this.handleChange}></input> </td>
      </tr>
    );
  }
});
*/
