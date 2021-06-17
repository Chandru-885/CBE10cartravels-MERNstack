import React, { Component } from 'react'
import {Link} from "react-router-dom";
import authHeader from '../services/auth-header';
import AuthService from '../services/auth'

export default class ConfirmBooking extends Component {
    constructor(props){
        super(props);
        this.state = {confirmbooking: props.location.query.confirmdata}
        console.log("props",props)
        console.log("localconfirmbookingstate",this.state.confirmbooking)
    }

    submitbooked(){
        var userid  =  AuthService.finduserid();
        var usernameid = AuthService.findusername();
        fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/carbookedusers', {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({user_name:this.state.confirmbooking[0], phoneNumber: this.state.confirmbooking[1] , FromLocation: this.state.confirmbooking[2], ToLocation:this.state.confirmbooking[3],  user: userid, usernameid : usernameid, DateTime : new Date().toLocaleString()}),
        })
        .then(res=>{
            if(res.status == 201){
                this.props.history.push("/thankyou");
            }
        })
    }

    cancel(){
        alert("You're at the door step !\nWe will be waiting for your Booking\nThank You!")
        this.props.history.push("/localpackagelist");
    }

    render() {
        return (
        <div className="MainDiv">
        <div className="confirmbooking-loginpage">
            <div className="confirmbooking-user_login_top">
                    <p className="confirmbooking-user_login">Confirm Booking</p>
            </div>
            <div className="confirmdata">
                <p>{this.state.confirmbooking[0]}</p>
                <p>{this.state.confirmbooking[1]}</p>
                <p><small>Pickup Location</small></p>  
                <p>{this.state.confirmbooking[2]}</p>
                <p><small>Drop Location</small></p>  
                <p>{this.state.confirmbooking[3]}</p>
                <Link to={'/thankyou'} className="linkcolor">
                    <button type="button"  className="btn btn-success m-1" onClick={this.submitbooked.bind(this)}> Confirm </button>
                </Link>
                <button type="button" className="btn btn-danger m-1" onClick={this.cancel.bind(this)}> Cancel </button>
            </div>
        </div>
        {/* <footer>
            <p>&copy; 2021 done by Chandru</p>
        </footer> */}
      </div>

        )
    }
}
