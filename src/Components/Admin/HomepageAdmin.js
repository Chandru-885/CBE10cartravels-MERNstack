import React, { Component } from 'react'
import '../App.css'
import { Button, Card} from 'react-bootstrap'
import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import authHeader from '../services/auth-header';

export default class HomepageAdmin extends Component {
    constructor(){
        super();
        this.state = {GalleryDatas: [], message: ''}
    }

    componentDidMount(){
        fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/adminHomePage',{
            headers:authHeader()
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({GalleryDatas: data.data})
        });
    }

    deletepackage(packagenameid){
        fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/adminHomePage/' + packagenameid, {
            headers:authHeader(),
            method: 'DELETE'
         })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/adminHomePage')
            .then(res=>res.json())
            .then(data=>{
                this.setState({GalleryDatas: data.data})
            });
        });
    }

    render() {
        let GalleryList = this.state.GalleryDatas.map((Gallerydata, i)=>{
            return (
                <div className="col-12 col-sm-6 col-md-6 col-xl-4">
                <Card className="Card_Gallery m-2  border-0" key={i}>
                  <Card.Img variant="top" src={Gallerydata.packageimage} width="340px" height="250px"/>
                  <Card.Body className="text-center">
                      <Card.Title className="text-success cardtitle"><b>{Gallerydata.packagename}</b></Card.Title>
                      <Card.Text >
                          <p className="card-text text-primary">{Gallerydata.packagedetails}</p>
                          <p className="card-text text-info"> Car Type : {Gallerydata.carType}</p>
                          <p className="card-text text-secondary"> No. of Days : <b>{Gallerydata.noofdays}</b> day package</p>
                          <p className="card-text"><b>Price @ ₹{Gallerydata.packageprice}</b></p>
                      </Card.Text>
                      <Button variant="outline-primary" className="m-2"><Link to={'updatepackagedetail/' + Gallerydata.packagenameid}>Update</Link></Button>
                        <Button variant="outline-danger" onClick={this.deletepackage.bind(this, Gallerydata.packagenameid)} className="m-2" disabled={true}>Delete</Button>
                   </Card.Body>
                </Card>
             </div>
            );
        })
        return (
            <div className="MainDiv">
                <Container>
                    <div className="tourpackage">
                          <p>Tour Packages</p>
                    </div>
                    <Row>
                      {GalleryList}
                    </Row>
                </Container>

               

            </div>
        )
    }
}
