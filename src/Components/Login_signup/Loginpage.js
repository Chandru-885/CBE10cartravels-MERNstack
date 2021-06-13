import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Container,Button} from 'react-bootstrap'
import {connect} from 'react-redux';
import * as actions from '../action/auth-action';

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {emailid: "", password:"", showalert : false,
                      emailidCheck:"form-control",passwordCheck:"form-control" }
    }

    emailidHandler(event) {
        let email1 = event.target.value;
        var validemail = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
        if(validemail.test(email1)){
            this.setState({emailidCheck:"form-control is-valid",emailid:email1})
        }
        else{this.setState({emailidCheck:"form-control is-invalid"})}
        console.log(this.state.emailid,  event.target.value)
    }

    passwordHandler(event) {
        let password1 = event.target.value;
        if(password1.length < 7) {this.setState({passwordCheck:"form-control is-invalid"})}
        else {this.setState({passwordCheck:"form-control is-valid",password:event.target.value})}
        console.log(this.state.password ,  event.target.value)
    }

    loginuser(event){
        event.preventDefault();
        if(this.state.emailidCheck === "form-control is-valid" && this.state.passwordCheck === "form-control is-valid"){
            let user = {emailid: this.state.emailid, password : this.state.password}
            console.log("userdetail",user);
            this.props.onUserLogin(user);
        }else{
            alert("Please Enter All the fields Correctly!")
        } 
    }

    render() {
        return (
            <div className="MainDiv">
               <Container className="mt-3 mb-4 p-3">
                <div className="loginpage">
                    
                    <div className="user_login_top"></div>

                    <p className="user_login mt-2">User Login</p>

                    <form>

                        <div className="form-group">
                           <div className="form-group row">
                                <div class="input-group mb-2">

                                    <div class="input-group-prepend">
                                        <div class="input-group-text"><i class="fas fa-envelope-square"></i></div>
                                    </div>

                                    <input type="email" onChange={this.emailidHandler.bind(this)} class={this.state.emailidCheck} id="email" placeholder="Email Id"/>
                                    <small class="invalid-feedback text-left"> 
                                        Please Enter Valid Email-Id
                                    </small>

                                </div>
                            </div>

                            <div className="form-group row">
                                <div class="input-group mb-2">

                                    <div class="input-group-prepend">
                                        <div class="input-group-text"><i class="fas fa-unlock-alt"></i></div>
                                    </div>

                                    <input type="password"  onChange={this.passwordHandler.bind(this)} class={this.state.passwordCheck} id="password" placeholder="Create Password"/>
                                    <small class="invalid-feedback text-left"> 
                                        Password Should be minimum of length 8
                                    </small>

                                 </div>
                            </div>

                        </div>
                        {/* <Link to={'/'} className="linkcolor"> */}
                               <Button onClick={this.loginuser.bind(this)} className="login-button"> <Link to={'/'} className="linkcolor"> Log in</Link></Button>
                        {/* </Link> */}
                    </form>
                    <p className="text-muted mt-3 mb-1">Create Your Account </p>
                    <Link to={'/signup'} className="linkcolor">
                         <Button className="login-signup-button mb-4">Sign up</Button>
                    </Link>
                </div>
               </Container>
               {/* <footer>
                 <p>&copy; 2021 done by Chandru</p>
                </footer> */}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUserLogin: (user)=>dispatch(actions.userLogin(user))
    }
  }
  
export default connect(null, mapDispatchToProps)(LoginPage);
