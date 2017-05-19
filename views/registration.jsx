 var Registration = React.createClass({ 
	   componentWillMount: function() {

   },

      registration: function(e){
	  console.log("Hello World");

         
		 //var x=document.getElementById("uname").value;
		 //localStorage.setItem("username", x);
		 //console.log(x);
		 document.getElementById("regForm").submit();
      },
      
      render: function() {
      return (
      	<div>
<div className="text-center" >
	<div className="logo">Register With Us...... To Use Our App......</div>
	
	<div className="login-form-1">
		<form id="regForm" className="text-left" action="registration" method="POST">
			<div className="login-form-main-message"></div>
			<div className="main-login-form">
				<div className="login-group">
					<div className="form-group">
						<label className="sr-only">Email address</label>
		  <input type="text" id="uName" className="form-control" name="uName" placeholder="Username"></input>
						
					</div>
					<div className="form-group">
						<label className="sr-only">Password</label>
						<input type="password" className="form-control" id="reg_password" name="reg_password" placeholder="password"></input>
					</div>
					
					<div className="form-group">
						<label className="sr-only">Email</label>
						<input type="text" className="form-control" id="reg_email" name="email" placeholder="Email"></input>
					</div>
					<div className="form-group">
						<label className="sr-only">Full Name</label>
						<input type="text" className="form-control" id="reg_fullname" name="fullName" placeholder="Full name"></input>
					</div>
		  
		  								<div className="form-group">
						<label className="sr-only">Phone No</label>
						<input type="number" className="form-control" id="phn" name="phnNo" placeholder="Phone No"></input>
					</div>			
				</div>
				<button type="button" className="login-button" onClick={this.registration}><i className="fa fa-chevron-right"></i></button>
			</div>
			<div className="etc-login-form">
				<p>already have an account? <a href="/">login here</a></p>
			</div>
		</form>
	</div>
	
</div>
		
		</div>
		 );
       }
      });
	
	
	
	ReactDOM.render(<Registration />, document.getElementById('reactRegistrationContainer'));