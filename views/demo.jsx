 var LogIn = React.createClass({ 
	   componentWillMount: function() {
      //this.getTasks()
	  
	  console.log("Hello");
	  
   },

 
      
      logIn: function(e){
	  console.log("Hello World");
	  
	  
      	
         
		 var x=document.getElementById("uname").value;
		 localStorage.setItem("username", x);
		 //console.log(x);
		 document.getElementById("myForm").submit();
      },
      
      render: function() {
	  //console.log("Hello"+this.state.CtaskDetails);
      
      //this.CgetTasks();
      return (
      	<div>
      	
		
		<div >
		<div className="logo">Lets Start....</div>
		<div className="login-form-1">
		<form className="text-left" id="myForm" action="logIn" method="POST">
			<div className="login-form-main-message"></div>
			<div className="main-login-form">
				<div className="login-group">
					<div className="form-group">
						<label  className="sr-only">Username</label>
						<input id="uname" name="username" ref={(a) => this.username = a} className="form-control" className="form-control" type="text" placeholder="Your UserName"></input>
					</div>
					<div className="form-group">
						<label  className="sr-only">Password</label>
						<input type="password" name="password" className="form-control" ref={(b) => this.password = b} id="lg_password" placeholder="password"></input>
					</div>
				</div>
				<button type="button" className="login-button" onClick={this.logIn} title="LogIn"><i className="fa fa-chevron-right"></i></button>
			</div>
			<div className="etc-login-form">
				<p>forgot your password? <a href="#">click here</a></p>
				<p>new user? <a href="registraionPage">create new account</a></p>
			</div>
		</form>
	</div>
	</div>
	
	
		
		
		</div>
		 );
       }
      });
	
	
	
	ReactDOM.render(<LogIn />, document.getElementById('reactLogInContainer'));