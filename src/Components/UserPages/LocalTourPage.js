import React, { Component } from 'react'
import {Container, Row} from 'react-bootstrap' 
import car4 from '../Assets/car4.png';
import kovai from '../Assets/kovai.JPG';
import localtour1 from '../Assets/localtour1.jpg';
import localtour2 from '../Assets/localtour2.jpg';
import localtour3 from '../Assets/localtour3.jpg';
import localtour4 from '../Assets/localtour4.jpg';
import localtour5 from '../Assets/localtour5.jpg';
import localtour6 from '../Assets/localtour6.jpg';
import AuthService from '../services/auth'
import {Link} from "react-router-dom";

export default class LocalTourPage extends Component {
    constructor(){
        super();
        this.username_ = false
        this.phonenum_ = false
        this.pickup_   = false
        this.drop_     = false
        this.state = {username:"", phonenumber:"", fromlocation:"", tolocation:"", usernameCheck:"form-control", phonenumberCheck:"form-control", fromlocationCheck:"form-control", tolocationCheck:"form-control", currentuserid : [],
                    //   localplacename : ["Isha Yoga","Marudhamalai Temple","Kovai Kutralam","Brookefield","Prozone","Gedee Museum"],
                      localplaceimage :[[localtour1,"Isha Yoga"],[localtour2,"Marudhamalai Temple"],[localtour3,"Kovai Kutralam"],[localtour4,"Brookefield"],[localtour5,"Prozone"],[localtour6,"Gedee Museum"]],
                    }
    }

    usernameHandler(event){
        let username1 = event.target.value;
        var validusername = new RegExp('[a-zA-Z\s]{3,25}');
        if (validusername.test(username1)) {
            this.setState({usernameCheck:"form-control is-valid",username:username1})
            this.username_ = true
        }
        else {this.setState({usernameCheck:"form-control is-invalid"})
             this.username_ = false}
    }

    phonenumberHandler(event){
        let phonenumber1 = event.target.value;
        var validphonenumber = new RegExp('^[6-9]{1}[0-9]{9}$');
        if (validphonenumber.test(phonenumber1)) {
            this.setState({phonenumberCheck:"form-control is-valid",phonenumber:phonenumber1})
            this.phonenum_ = true
        }
        else {this.setState({phonenumberCheck:"form-control is-invalid"})
             this.phonenum_ = false}
    }

    fromlocationHandler(event){
        let fromlocation1 = event.target.value;
        if (fromlocation1.length >= 10) {
            this.setState({fromlocationCheck:"form-control is-valid",fromlocation:fromlocation1})
            this.pickup_ = true
        }
        else {this.setState({fromlocationCheck:"form-control is-invalid"})
             this.pickup_ = false}
    }

    tolocationHandler(event){
        let tolocation1 = event.target.value;
        if (tolocation1.length >= 10) {
            this.setState({tolocationCheck:"form-control is-valid",tolocation:tolocation1})
            this.drop_ = true
        }
        else {this.setState({tolocationCheck:"form-control is-invalid"})
             this.drop_ = false}
    }
    
    render(){
        var local_gallery_list = this.state.localplaceimage.map((images,i)=>{
            return(
                <div className="col-12 col-sm-12 col-md-6 col-xl-4" key={i}>
                <div className="Card_Gallery1 text-center localtourCard  border-0">
                    <div>
                        <img variant="top" src={images[0]}  alt="galleryimages"/>
                        <p className="title-font">{images[1]}</p>
                    </div>
                </div>
                </div>
            );
        })

        var show = true
        if(this.phonenum_ && this.username_ && this.pickup_ && this.drop_){
            show = false
        }

        var hidden_ = true
        if(AuthService.findrole() === "user"){
            hidden_ = false
        }else{
            hidden_ = true
        }

        return (
        
        <div className="MainDiv">
             <div className="new-booking-body row">
                    <div className="car-img-div">
                        <span className="main-heading"> Book your <br></br> Local travel location<br></br>Here ! 🚗</span>
                    </div>
                    <div className="main-content-div">
                        <img className="car-main-img" src={car4} alt="car"></img> 
                    </div>   
            </div>

            <Container>
               <Row className="popular-image-kovai">
                    <div className="poupular-places">
                        <p> Popular Places</p>
                    </div>
               </Row>
               <div className="row">
                     {local_gallery_list}
               </div>
             
                         
             </Container>
        
        <div className="form-bg">
        <div className="newbooking-loginpage">
        <div className="newbooking-user_login_top"></div>
        <p className="mt-2 newbooking-user_login">Travel local places in Coimbatore</p>
        {/* <form onSubmit={this.addBooking.bind(this)} className="newbooking-form"> */}
        <form className="newbooking-form"> 
            <div className="form-group pb-2">
                <div className="form-group row">
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text"><i class="fas fa-user"></i></div>
                        </div>
                        <input type="text"  onChange={this.usernameHandler.bind(this)} class={this.state.usernameCheck} id="name" placeholder="Name"/>
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
                        <input type="number"  onChange={this.phonenumberHandler.bind(this)} class={this.state.phonenumberCheck} id="phonenumber" placeholder="Phonenumber"/>
                        <small class="invalid-feedback text-left"> 
                            Please Enter Valid phonenumber
                        </small>
                    </div>
                </div>  
                <div className="form-group row">
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text"><i class="fas fa-map-marker-alt"></i></div>
                        </div>
                        <input type="text"  onChange={this.fromlocationHandler.bind(this)} class={this.state.fromlocationCheck}  id="inputFromLocation" placeholder="Pickup Location"/>
                        <small class="invalid-feedback text-left"> 
                            Please Enter Valid Location of Min length 10
                        </small>
                    </div>
                </div>
                <div className="form-group row">
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text"><i class="fas fa-location-arrow"></i></div>
                        </div>
                        <input type="text"  onChange={this.tolocationHandler.bind(this)} class={this.state.tolocationCheck}  id="inputToLocation" placeholder="Drop Location"/>
                        <small class="invalid-feedback text-left"> 
                            Please Enter Valid Location of Min length 10
                        </small>
                    </div>
                </div>
                <Link to = {{pathname : '/confirmbooking', query : {confirmdata : [this.state.username, this.state.phonenumber, this.state.fromlocation, this.state.tolocation] }}}>
                    <input type="submit" className="btn btn-info mb-4"  value="Book now" disabled = {show} hidden = {hidden_}/>
                </Link>
                {/* <input type="submit" className="btn btn-info mb-4" value="Book now" disabled = {show} hidden={hidden_}/> */}
            </div>
            </form>
        </div>
        </div>
        <img src={kovai} width="100%" className="love-kovai"></img>
      
   </div>
        )
    }
}

