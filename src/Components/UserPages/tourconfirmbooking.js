import React, { Component } from 'react'
import {Link} from "react-router-dom";
import authHeader from '../services/auth-header';
import AuthService from '../services/auth'

export default class TourConfirmBooking extends Component {
    constructor(props){
        super(props);
        this.state = {tourconfirmbooking : props.location.query.confirmdata , UserName : props.location.query.UserName, PhoneNumber : props.location.query.PhoneNumber, userselectedDetails:[]}
        // console.log("props",props)
        // console.log("props",this.state.tourconfirmbooking, this.state.UserName, this.state.PhoneNumber)
    }

    submittourbooked(){
        var userid  =  AuthService.finduserid();
        var usernameid = AuthService.findusername();
        fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/cartourbookedusers', {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({name:this.state.UserName, phoneNumber: this.state.PhoneNumber , packagename: this.state.tourconfirmbooking[0], packageprice:this.state.tourconfirmbooking[1], carType:this.state.tourconfirmbooking[2], noofdays: this.state.tourconfirmbooking[3], packageDate : new Date().toLocaleString(), user: userid, usernameid : usernameid}),
        })
        .then(res=>{
            if(res.status == 201){
                this.props.history.push("/thankyou");
            }
        })
    }

    cancel(){
        alert("You're at the door step !\nWe will be waiting for your Booking\nThank You!")
        this.props.history.push("/tourpackagelist");
    }

    render() {
        return (
          <div className="MainDiv">
            <div className="confirmbooking-loginpage">
              <div className="confirmbooking-user_login_top">
                    <p className="confirmbooking-user_login">Confirm Booking</p>
              </div>
            <div className="confirmdata">
                <p>{this.state.UserName}</p>
                <p>{this.state.PhoneNumber}</p>
                <p>{this.state.tourconfirmbooking[0]}</p>
                <p>{this.state.tourconfirmbooking[3]} day package</p>  
                <p>{this.state.tourconfirmbooking[2]}</p>
                <p>Final Price : {this.state.tourconfirmbooking[1]}</p>
                <Link to={'/thankyou'} className="linkcolor">
                    <button type="button"  className="btn btn-success m-1" onClick={this.submittourbooked.bind(this)}> Confirm </button>
                </Link>
                <button type="button" className="btn btn-danger m-1" onClick={this.cancel.bind(this)}> Cancel </button>
            </div>
          </div>
        </div>

        )
    }
}
