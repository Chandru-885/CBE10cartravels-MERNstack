import React, { Component } from 'react'
import authHeader from '../services/auth-header';
import {Link} from "react-router-dom";


export default class TourBeforeConfirm extends Component {
    constructor(){
        super();
        this.username_ = false
        this.phonenum_ = false
        this.state = {currentCardData: [], datalist:[],name_:[],pass_:[],usernameCheck:"form-control",phonenumberCheck:"form-control"}
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        console.log(this.props);
        fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/adminHomePage/'+params.packagenameid,{
            headers:authHeader()
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.setState({currentCardData: data, datalist:[data.packagename,data.packageprice,data.carType,data.noofdays]})
        })
    }

    usernameHandler(event){
        let username1 = event.target.value;
        var validusername = new RegExp('[a-zA-Z\s]{3,25}');
        if (validusername.test(username1)) {
            this.state.name_.push(username1)
            this.setState({usernameCheck:"form-control is-valid"})
            this.username_ = true
        }
        else {this.setState({usernameCheck:"form-control is-invalid"})
            this.username_=false
        }
    }

    phonenumberHandler(event){
        let phonenumber1 = event.target.value;
        var validphonenumber = new RegExp('^[6-9]{1}[0-9]{9}$');
        if (validphonenumber.test(phonenumber1)) {
            this.state.pass_.push(phonenumber1)
            this.setState({phonenumberCheck:"form-control is-valid"})
            this.phonenum_ = true
        }
        else {this.setState({phonenumberCheck:"form-control is-invalid"})
             this.phonenum_ = false
        }
    }

    render() { 
        var show = true
        if(this.phonenum_ && this.username_){
            show = false
        }
        return (
         <div className="form-align">
            <div className="newbooking-loginpage change-bg">
            <div className="newbooking-user_login_top change-color"></div>
            <p className="mt-2 change-font-size">Please Give Name and Phonenumber for further contact !</p>
                <form className="newbooking-form" autoComplete="off" aria-required required>
                <div className="form-group">

                <div className="form-group row">
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text"><i class="fas fa-user"></i></div>
                        </div>
                        <input type="text"  pattern="[A-Za-z]{3}" onChange={this.usernameHandler.bind(this)} class={this.state.usernameCheck} id="name" placeholder="Name" required="true"/>
                        <small class="invalid-feedback text-left"> 
                            Please Enter Valid Username
                        </small>
                    </div>
                </div>
                <div className="form-group row">
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text"><i class="fas fa-mobile-alt"></i></div>
                        </div>
                        <input type="number"  onChange={this.phonenumberHandler.bind(this)} class={this.state.phonenumberCheck} id="phonenumber" placeholder="Phonenumber" required="true"/>
                        <small class="invalid-feedback text-left"> 
                            Please Enter Valid phonenumber
                        </small>
                    </div>
                </div>  
               
                <Link to = {{pathname : '/tourconfirmbooking', query : {confirmdata : this.state.datalist, PhoneNumber : this.state.pass_[this.state.pass_.length - 1], UserName : this.state.name_[this.state.name_.length - 1]} }}>
                    <input type="submit" className="btn btn-primary btn-color mb-4"  value="Continue" disabled = {show}/>
                </Link>
                </div>
                </form>
                </div>
            </div>
        )
    }
}
