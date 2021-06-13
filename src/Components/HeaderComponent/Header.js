import React, { Component } from 'react'
import '../App.css'
import {Button} from 'react-bootstrap' 
import {Link} from "react-router-dom";

export default class Header extends Component {
    constructor(){
        super();
        this.state = {navbarshow:"collapse navbar-collapse justify-content-end", ShowStatus : false}
    }

    logout(){
        localStorage.removeItem('token');
        this.props.history.push("/");
        window.location.reload();
    }

    show(){
        if(!this.state.ShowStatus){
          this.setState({navbarshow:"collapse navbar-collapse justify-content-end show", ShowStatus : true})
        }else{
          this.setState({navbarshow:"collapse navbar-collapse justify-content-end", ShowStatus : false})
        }
    }

    render() {
        return (
            <div className="MainDiv">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to={'/'} className="linkcolor">
              <div className="navbar-brand">
                    <img alt="logo" src="https://yt3.ggpht.com/a/AATXAJyxJPOgMaAd69NNjLLzYBhyJmNT8PpQb3M4YS7jrA=s176-c-k-c0xffffffff-no-rj-mo" className="d-inline-block logoimg align-top"/>
                    <span className="cartarvels">Car Travels</span>
              </div>
              </Link>

                <button className="navbar-toggler" type="button" onClick={this.show.bind(this)} data-toggle="collapse" data-target="#navbarNavDropdown">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={this.state.navbarshow} id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <Button variant="outline-primary" className="m-2" ><Link to={'/localnewbooking'} className="linkcolor">Local Package</Link></Button>
                        <Button variant="outline-warning" className="m-2" ><Link to={'/tourpackagelist'} className="linkcolor">Tour Package</Link></Button>
                        <Button variant="outline-secondary" className="m-2" ><Link to={'/carKilometerDetails'} className="linkcolor">Car Details</Link></Button>
                        <Button variant="outline-info" className="m-2"><Link to={'/signup'} className="linkcolor">Sign Up </Link></Button>
                        <Button variant="outline-info" className="m-2"><Link to={'/login'} className="linkcolor">Log In </Link></Button>
                    </ul>
                </div>

                </nav>
            </div>
        )
    }
}



{/* <Nav.Item className="ml-auto">
                    
                    <Button variant="outline-primary" className="m-2" ><Link to={'/localnewbooking'} className="linkcolor">Local Package</Link></Button>
                    <Button variant="outline-warning" className="m-2" ><Link to={'/tourpackagelist'} className="linkcolor">Tour Package</Link></Button>
                    <Button variant="outline-info" className="m-2"><Link to={'/signup'} className="linkcolor">Sign Up </Link></Button>
                    <Button variant="outline-info" className="m-2"><Link to={'/login'} className="linkcolor">Log In </Link></Button>
                </Nav.Item> */}