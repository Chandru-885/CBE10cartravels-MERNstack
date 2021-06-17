import React, { Component } from 'react'
import {Container} from 'react-bootstrap'
import authHeader from '../services/auth-header';

export default class AddpackageAdmin extends Component {
    constructor(){
        super();
        this.packagenameid  = React.createRef();
        this.packagename    = React.createRef();
        this.packagedetails = React.createRef();
        this.packageprice   = React.createRef();
        this.packageimage   = React.createRef();
        this.carType        = React.createRef();
        this.noofdays       = React.createRef();
        this.state = {GalleryDatas: [],message: "" }
    }

    AddPackageDetail(event){
        event.preventDefault();
        if(this.packagenameid.current.value ==="" || this.packagename.current.value === "" || this.packagedetails.current.value === "" || this.packageprice.current.value === "" || this.packageimage.current.value === "" ||  this.carType.current.value === "" || this.noofdays.current.value === ""){
            this.setState({message: 'Enter all the fields'})
        }else{
            fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/adminHomePage', {
                method: 'POST',
                headers: authHeader(),
                body: JSON.stringify({packagenameid: this.packagenameid.current.value, packagename: this.packagename.current.value, packagedetails: this.packagedetails.current.value, packageprice : this.packageprice.current.value, packageimage : this.packageimage.current.value, carType:this.carType.current.value,noofdays:this.noofdays.current.value}),
            })
            .then(res=>{
                console.log(res.status);
                if(res.status === 201){
                    this.setState({message: 'Successfully Added ✔ 😍'})
                    event.target.reset();
                }
            })
        } 
    }

    closemessage(){
        this.setState({message : ""})
    }

    render() {
        if(this.state.message){
             var message = (
                <div class="alert alert-success" role="alert">
                    {this.state.message}
                   <button type="button" className="closebutton float-right" onClick={this.closemessage.bind(this)}>x</button>
                </div>
        )}
        return (
        <div className="MainDiv">
               <Container className="p-3">
                {message}
                <form onSubmit={this.AddPackageDetail.bind(this)}>
                    <div className="form-group">
                        <div className="form-group row">
                            <label for="inputpackagenameid" className="col-sm-2 col-form-label">Package Name Id</label>
                            <div className="col-sm-10">
                                <input ref={this.packagenameid} type="text" class="form-control" id="inputpackagenameid" placeholder="Enter PackageName Id" required/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="inputpackagename" className="col-sm-2 col-form-label">Package Name</label>
                            <div className="col-sm-10">
                                <input ref={this.packagename} type="text" class="form-control" id="inputpackagename" placeholder="Enter PackageName" required/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="inputpackagedetails" className="col-sm-2 col-form-label">Package Detail</label>
                            <div className="col-sm-10">
                                <input ref={this.packagedetails} type="text" class="form-control" id="inputpackagedetails" placeholder="Enter Package Detail" required/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="inputpackageprice" className="col-sm-2 col-form-label">Package Price</label>
                            <div className="col-sm-10">
                                <input ref={this.packageprice} type="number" class="form-control" id="inputpackageprice" placeholder="Enter Package Price" required/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="inputpackageimage" className="col-sm-2 col-form-label">Package Image URL</label>
                            <div className="col-sm-10">
                                <input ref={this.packageimage} type="text" class="form-control" id="inputpackageimage" placeholder="Enter Package Image URL" required/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="inputcarType" className="col-sm-2 col-form-label">Car Type</label>
                            <div className="col-sm-10">
                                <input ref={this.carType} type="text" class="form-control" id="carType" placeholder="Enter Car Type" required/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="inputnoofdays" className="col-sm-2 col-form-label">No. of Days </label>
                            <div className="col-sm-10">
                                <input ref={this.noofdays} type="text" class="form-control" id="inputnoofdays" placeholder="Enter Package Days" required/>
                            </div>
                        </div>
                        <input type="submit" value="Add Package 🚗" className="btn btn-primary m-2" disabled/>
                    </div>
                </form>
                </Container>
            </div>
        )
    }
}
