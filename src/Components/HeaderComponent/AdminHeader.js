import React, { Component } from 'react'
import '../App.css'
import { Button} from 'react-bootstrap' 
import {Link} from "react-router-dom";
import * as actions from '../action/auth-action';
import {connect} from 'react-redux';
import logo from "../Assets/logo.JPG"

class AdminHeader extends Component {
    constructor(){
        super();
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
           <p>CarTravels for a particular city   (Eg: coimbatore). This site is designed for practice purpose. Add/ Delete/ update functionality is disabled. Try user signin/login</p>
           <p>For user: user@gmail.com password:user1234</p>
        </div>
      )
        return (
            <div className="MainDiv">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="navbar-brand">
                <Link to={'/'} className="linkcolor">
                    <img alt="logo" src={logo} className="d-inline-block align-top logoimg"/>
                    {/* <span className="cartarvels">Car Travels</span> */}
                </Link>
              </div>

                <button className="navbar-toggler" type="button" onClick={this.show.bind(this)} data-toggle="collapse" data-target="#navbarNavDropdown">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={this.state.navbarshow} id="navbarNavDropdown">
                    <ul className="navbar-nav">
                    <Button variant="outline-secondary" className="m-2" ><Link to={'/Admintourchart'} className="linkcolor">Graph</Link></Button>
                        <Button variant="outline-success" className="m-2"><Link to={'/adminhomepage'} className="linkcolor">Edit Tours </Link></Button>
                        <Button variant="outline-warning" className="m-2"><Link to={'/addpackagedetail'} className="linkcolor">Add Tour</Link></Button>
                        <Button variant="outline-info" className="m-2"><Link to={'/adminAllTourbookinglist'} className="linkcolor">Tour Bookings</Link></Button>
                        {/* <Button variant="outline-info" className="m-2"><Link to={'/Adminbookingdata'} className="linkcolor">Bookings</Link></Button> */}
                        <Button variant="outline-info" className="m-2"><Link to={'/adminAllLocalBookingList'} className="linkcolor">Local Bookings </Link></Button>
                        <Button variant="outline-success" className="m-2"><Link to={'/allsignedupusers'} className="linkcolor">Signed Users</Link></Button>
                        <Button variant="outline-secondary" className="m-2" ><Link to={'/carKilometerDetailsAdmin'} className="linkcolor">Car Details</Link></Button>

                        <Button variant="outline-info" className="m-2"> <Link to = {'/'} onClick={()=>this.props.onUserLogout()}>Log Out</Link></Button>
                        {/* <Button variant="outline-danger" className="m-2"  onClick={this.logout.bind(this)}>Log Out</Button> */}
                    </ul>
                </div>
                </nav>
                {message1}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('Inside Admin Component ', state);
    return {
      authenticated: state.authReducer.authenticated
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
      onUserLogout: (user)=>dispatch(actions.login(false))
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader);
