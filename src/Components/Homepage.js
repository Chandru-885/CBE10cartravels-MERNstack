import React, { Component } from 'react'
import './App.css'
import {Link} from "react-router-dom";
import {Card,Row,Container} from 'react-bootstrap' 
import Carousel from 'react-bootstrap/Carousel'
import car1 from './Assets/car1.png';
import homecarousal1 from './Assets/home_carousal_1.jpg'
import homecarousal2 from './Assets/home_carousal_2.jpg'
import homecarousal3 from './Assets/home_carousal_3.jpg'

import Gallery_11 from './Assets/home_gallery_1.jpg'
import Gallery_12 from './Assets/home_gallery_2.jpg'
import Gallery_13 from './Assets/home_gallery_3.jpg'
import Gallery_14 from './Assets/home_gallery_4.jpg'
import Gallery_21 from './Assets/home_gallery_21.jpg'
import Gallery_22 from './Assets/home_gallery_22.jpg'
import Gallery_23 from './Assets/home_gallery_23.jpg'
import Gallery_24 from './Assets/home_gallery_24.jpg'
import Gallery_31 from './Assets/home_gallery_31.jpg'
import Gallery_32 from './Assets/home_gallery_32.jpg'
import Gallery_33 from './Assets/home_gallery_33.jpg'
import Gallery_34 from './Assets/home_gallery_34.jpg'





export default class Homepage extends Component {
    constructor(){
        super();
        this.state = {GalleryDatas: []}
    }
    componentDidMount(){
        fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/adminHomePage')
        .then(res=>res.json())
        .then(data=>{
            this.setState({GalleryDatas: data.data})
        });
    }

    render() {
        console.log(this.state.GalleryDatas)
        let GalleryList = this.state.GalleryDatas.map((Gallerydata, i)=>{
            if(i<3){
                return (
                <div className="col-12 col-sm-12 col-md-4 col-xl-4">
                    <Card className="Card_Gallery border-0" key={i}>
                      <Card.Img variant="top" src={Gallerydata.packageimage} width="340px" height="250px"/>
                      <Card.Body>
                          <Card.Title className="text-success cardtitle"><b>{Gallerydata.packagename}</b></Card.Title>
                          <Card.Text >
                              <p className="card-text text-primary">{Gallerydata.packagedetails}</p>
                              <p className="card-text text-info"> Car Type : {Gallerydata.carType}</p>
                              <p className="card-text text-secondary"> No. of Days : <b>{Gallerydata.noofdays}</b> day package</p>
                              <p className="card-text"><b>Price @ ₹{Gallerydata.packageprice}</b></p>
                          </Card.Text>
                     </Card.Body>
                    </Card>
                 </div>
               );
            }
        })
        return (
            <div className="MainDiv">
                <Carousel>
                    <Carousel.Item>
                        <img className="d-block carouselImg"src={homecarousal1} alt="Ooty"/>
                        <Carousel.Caption><h3>Ooty</h3></Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block carouselImg" src={homecarousal2} alt="Mysore palace"/>
                        <Carousel.Caption><h3>Mysore</h3></Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block carouselImg" src={homecarousal3} alt="Madhurai temple"/>
                        <Carousel.Caption><h3>Madurai</h3></Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

            <Row className="homepage-second-main">
                    <div className="homepage-main-content-div">
                        <img className="homepage-car-main-img" src={car1} alt="car"></img> 
                     </div>   
                     <div className="homepage-car-img-div">
                        <span className="home-main-heading"> LOG IN <br></br> SELECT PACKAGE <br></br> TRAVEL</span>
                    </div>
            </Row>

                <div className="package">
                  <div className = "pack">
                      <Link to={'/tourpackagelist'} >
                        <div className="tour-package-div">
                          <span className="tour-span">Tour<br></br> Package</span>
                        </div>
                      </Link>
                      <Link to={'/localnewbooking'} >
                      <div className="local-package-div">
                         <span className="tour-span">Local <br></br>Package</span>
                      </div>
                      </Link>
                    </div>
                </div>
                <Container className="card_main_div">
                    <p className="tourpackage">Popular Packages</p>   
                </Container> 
                <Row className="px-3"> 
                    {GalleryList}
                </Row>
                <p className="Gallery">Gallery</p>
                <Carousel>
                    <Carousel.Item>
                        <div className="Gallery-slider">
                           <img src={Gallery_11} alt="gallry pic"/>
                           <img src={Gallery_12} alt="gallry pic"/>
                           <img src={Gallery_13} alt="gallry pic"/>
                           <img src={Gallery_14} alt="gallry pic"/>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                       <div className="Gallery-slider">
                           <img src={Gallery_21} alt="gallry pic"/>
                           <img src={Gallery_22} alt="gallry pic"/>
                           <img src={Gallery_23} alt="gallry pic"/>
                           <img src={Gallery_24} alt="gallry pic"/>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                       <div className="Gallery-slider">
                           <img src={Gallery_31} alt="gallry pic"/>
                           <img src={Gallery_32} alt="gallry pic"/>
                           <img src={Gallery_33} alt="gallry pic"/>
                           <img src={Gallery_34} alt="gallry pic"/>
                        </div>
                    </Carousel.Item>
                </Carousel>

            </div>
        )
    }
}
