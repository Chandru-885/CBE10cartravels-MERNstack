import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import React, { useState, useEffect } from "react";
import {connect} from 'react-redux';

import AddpackageAdmin from './Components/Admin/AddpackageAdmin';
import Homepage from './Components/Homepage';
import HomepageAdmin from './Components/Admin/HomepageAdmin';
import UpdatepackageAdmin from './Components/Admin/UpdatepackageAdmin';
import LoginPage from './Components/Login_signup/Loginpage';
import Signuppage from './Components/Login_signup/Signuppage';
import UserHomePage from './Components/UserPages/ErrorPage';
import LocalTourPage from './Components/UserPages/LocalTourPage';
import TourPackage from './Components/UserPages/TourPackage';
import ConfirmBooking from './Components/UserPages/ConfirmBooking';
import Thanks from './Components/UserPages/Thanks';
import TourConfirmBooking from './Components/UserPages/tourconfirmbooking';
import BookingList from './Components/UserPages/BookingList';
import AllsignedUsers from './Components/Admin/AllsignedUsers';
import Header from './Components/HeaderComponent/Header';
import AuthService from './Components/services/auth'
import AdminHeader from "./Components/HeaderComponent/AdminHeader";
import Tourbookinglist from "./Components/UserPages/Tourbookinglist";
import AllLocalBooked from "./Components/Admin/AllLocalBooked";
import AllTourBooked from "./Components/Admin/AllTourBooked";
import TourBeforeConfirm from "./Components/UserPages/TourBeforeConfirm";
import CarDetails from "./Components/UserPages/CarDetails";
import CarDetailsAdmin from "./Components/Admin/CarDetailsAdmin";
import AddCarKmdetail from "./Components/Admin/AddCarKmdetail";
import UpdateCarKmDetail from "./Components/Admin/UpdateCarKmDetail";
import UserLogDetail from "./Components/UserPages/UserLogDetail";
import Chart from "./Components/Admin/Chart";
import Booking from "./Components/Admin/Booking";
import UserHeader from "./Components/HeaderComponent/UserHeader";

function App(props) {

    if(props.authenticated){
      var role_ = AuthService.findrole()
      if(role_ == "user"){
        var navBar = <Route path="/"  component={UserHeader}></Route>  
      }else if(role_ == "admin"){
         var navBar = <Route path="/" component={AdminHeader}></Route>  
      }
    }else{
      console.log("props.authenticated nouser",props.authenticated)
      var navBar = <Route path="/" component={Header}></Route>  
    }

  return (
    <Router>
        {navBar}
        <Route path="/" exact component={Homepage}></Route>
      <Switch>
        <Route path="/mainhomepage" component={HomepageAdmin}></Route>
        <Route path="/updatepackage" component={UpdatepackageAdmin}></Route>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/notloggedinErrorpage" component={UserHomePage}></Route>
        <Route path="/signup" component={Signuppage}></Route>
        <Route path="/adminhomepage" component={HomepageAdmin}></Route>
        <Route path="/addpackagedetail" component={AddpackageAdmin}></Route>
        <Route path="/localnewbooking" component={LocalTourPage}></Route>
        <Route path="/tourpackagelist" component={TourPackage}></Route>
        <Route path="/confirmbooking" component={ConfirmBooking}></Route>
        {/* <Route path="/tourconfirmbooking/:currentdetails" component={TourConfirmBooking}></Route> */}
        <Route path="/tourconfirmbooking" component={TourConfirmBooking}></Route> 
        <Route path="/updatepackagedetail/:packagenameid" component={UpdatepackageAdmin}></Route>
        <Route path="/thankyou" component={Thanks}></Route>
        <Route path="/userlocalbookinglist" component={BookingList}></Route>
        <Route path="/usertourbookinglist" component={Tourbookinglist}></Route> 
        <Route path="/allsignedupusers" component={AllsignedUsers}></Route>
        <Route path="/adminAllLocalBookingList" component={AllLocalBooked}></Route>
        <Route path="/adminAllTourbookinglist" component={AllTourBooked}></Route>
        <Route path="/tourbeforeconfirmpage/:packagenameid" component={TourBeforeConfirm}></Route>
        <Route path="/carKilometerDetails" component={CarDetails}></Route>
        <Route path="/carKilometerDetailsAdmin" component={CarDetailsAdmin}></Route>
        <Route path="/addnewcarkmdetails" component={AddCarKmdetail}></Route>
        <Route path="/updatecarkmdetail/:vechicleid" component={UpdateCarKmDetail}></Route>
        <Route path="/userlogdetails" component={UserLogDetail}></Route>
        <Route path="/Admintourchart" component={Chart}></Route>
        <Route path="/Adminbookingdata" component={Booking}></Route>


      </Switch>
      <footer>
              <div className="row m-3">
                    <div className="col-12 col-sm-6 col-md-4 col-xl-4 col-ls">
                        <h5 className="mb-2">MERN Stack</h5>
                        <p>FrontEnd : React, React-Bootstrap, React-Redux, Bootstrap, Css</p>
                        <p>BackEnd : Express, Mongodb, Mongoose, Nodejs</p>
                        <p>DataBase : Mongodb</p>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-xl-4 col-ls">
                        <h5  className="mb-2">Deployment</h5>
                        <p>FrontEnd : Netlify </p>
                        <p>BackEnd : Heroku</p>
                        <p>DataBase : Mongodb Atlas</p>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-xl-4 col-ls">
                        {/* <p>&copy; 2021 Developed by Chandru</p> */}
                        <h5>2021 Developed by Chandru</h5>
                        <p>Thanks @puneet #trainer</p>
                    </div>
                        
                </div>
        </footer>
    </Router>
  );
}

const mapStateToProps = (state) => {
  console.log('Inside Component APP.Js ', state);
  return {
    authenticated: state.authReducer.authenticated
  }
}

export default connect(mapStateToProps, null)(App);


