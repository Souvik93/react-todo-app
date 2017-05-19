 var Registration = React.createClass({ 
	   componentWillMount: function() {

   },


   getInitialState:function() {
         return {
		msg:""
         };
       },
      registration: function(e){
	  console.log("Hello World");

	console.log(this.phnNo.value)

	  fetch('registration', {
         method: 'post',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
			'key':Date.now(),
           'uName': this.uName.value,
		   'reg_password':this.reg_password.value,
		   'email':this.email.value,
		   'fullName':this.fullName.value,
		   'phnNo':this.phnNo.value
         })
       })
       .then(response => {
         if (response.ok) return response.json()
       })
       .then(data => {
		
		console.log(data);

		if(data.status=="Failed" || data.status=="Wrong Value")
		{
			this.setState({
      msg: data.msg
       });

			var x=document.getElementById('alertBox');
			x.style.display = "block";
			console.log(data);
			
		}
		else
		{
			window.location="/";
		}

	   ;
       })





         
		 //var x=document.getElementById("uname").value;
		 //localStorage.setItem("username", x);
		 //console.log(x);
		 //document.getElementById("regForm").submit();
      },
      
      render: function() {
      return (
      	<div>

			<div className="alert alert-warning alert-dismissable" id="alertBox" style={{display:'none'}}>
    <a href="#" className="close" data-dismiss="alert" aria-label="close">×</a>
    <strong>Warning!</strong> {this.state.msg} 
  </div>
<div className="text-center" >
	<div className="logo">Register With Us...... To Use Our App......</div>
	
	<div className="login-form-1">
		<form id="regForm" className="text-left">
			<div className="login-form-main-message"></div>
			<div className="main-login-form">
				<div className="login-group">
					<div className="form-group">
						<label className="sr-only">Email address</label>
		  <input type="text" id="uName" ref={(a) => this.uName = a} className="form-control" name="uName" placeholder="Username"></input>
						
					</div>
					<div className="form-group">
						<label className="sr-only">Password</label>
						<input type="password" ref={(b) => this.reg_password = b} className="form-control" id="reg_password" name="reg_password" placeholder="password"></input>
					</div>
					
					<div className="form-group">
						<label className="sr-only">Email</label>
						<input type="text" ref={(c) => this.email = c} className="form-control" id="reg_email" name="email" placeholder="Email"></input>
					</div>
					<div className="form-group">
						<label className="sr-only">Full Name</label>
						<input type="text" ref={(d) => this.fullName = d} className="form-control" id="reg_fullname" name="fullName" placeholder="Full name"></input>
					</div>
		  
		  								<div className="form-group">
						<label className="sr-only">Phone No</label>
						<input type="number" ref={(e) => this.phnNo = e} className="form-control" id="phn" name="phnNo" placeholder="Phone No"></input>
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