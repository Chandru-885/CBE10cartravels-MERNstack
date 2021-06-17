import React, { Component } from 'react'
import '../App.css'
import {Button} from 'react-bootstrap' 
import {Link} from "react-router-dom";
import * as actions from '../action/auth-action';
import {connect} from 'react-redux';
import logo from "../Assets/logo.JPG"

class UserHeader extends Component {
    constructor(props){
        super(props);
        this.state = {navbarshow:"collapse navbar-collapse justify-content-end", ShowStatus : false}
    }
 
    show(){
        if(!this.state.ShowStatus){
          this.setState({navbarshow:"collapse navbar-collapse justify-content-end show", ShowStatus : true})
        }else{
          this.setState({navbarshow:"collapse navbar-collapse justify-content-end", ShowStatus : false})
        }
    }

    render() {
      var message1 = (
        <div class="alert alert-info mb-0" role="alert">
           <p>CarTravels for a particular city(Eg: coimbatore). This site is designed for practice purpose.Try adminlogin also</p>
           <p>For admin: admin@gmail.com password:admin1234</p>
        </div>
      )
        return (
            <div className="MainDiv">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="navbar-brand">
                <Link to={'/'} className="linkcolor">
                    <img alt="logo" src={logo} className="d-inline-block logoimg align-top"/>
                    <span className="cartarvels">Car Travels</span>
                </Link>
              </div>

                <button className="navbar-toggler" type="button" onClick={this.show.bind(this)} data-toggle="collapse" data-target="#navbarNavDropdown">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={this.state.navbarshow} id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <Button variant="outline-info" className="m-1"><Link to={'/userlocalbookinglist'} className="linkcolor">Local Booked</Link></Button>
                        <Button variant="outline-info" className="m-1"><Link to={'/usertourbookinglist'} className="linkcolor">Tour Booked</Link></Button>
                        <Button variant="outline-primary" className="m-1" ><Link to={'/localnewbooking'} className="linkcolor">Local Package</Link></Button>
                        <Button variant="outline-warning" className="m-1" ><Link to={'/tourpackagelist'} className="linkcolor">Tour Package</Link></Button>
                        <Button variant="outline-secondary" className="m-1" ><Link to={'/carKilometerDetails'} className="linkcolor">Car Details</Link></Button>
                        <Button variant="outline-primary" className="m-1"><Link to={'/userlogdetails'} className="linkcolor">User Log</Link></Button>
                        {/* <Button variant="outline-info" className="m-1"  onClick={this.logout.bind(this)}>Log Out</Button> */}
                        
                        <Button variant="outline-info" className="m-1"> <Link to = {'/'} onClick={()=>this.props.onUserLogout()}>Log Out</Link></Button>

                     </ul>
                </div>

                </nav>
                {message1}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('Inside Component ', state);
    return {
      authenticated: state.authReducer.authenticated
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
      onUserLogout: (user)=>dispatch(actions.login(false))
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);
