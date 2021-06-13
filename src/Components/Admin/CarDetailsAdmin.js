import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import authHeader from '../services/auth-header'
import { Button} from 'react-bootstrap'
import {Link} from "react-router-dom";

export default class CarDetailsAdmin extends Component {
        constructor(){
            super();
            this.searchinput = React.createRef();
            this.state = {Car_km_Details: []}
        }
    
        componentDidMount(){
            fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/CarkilometerDetails',{
                headers:authHeader()
            })
            .then(res=>res.json())
            .then(data=>{
                this.setState({Car_km_Details : data})
            });
        }

        deleteCar_km_Detail(vechicleid){
            fetch('http://localhost:8010/api/v1/CarkilometerDetails/' + vechicleid, {
            headers:authHeader(),    
            method: 'DELETE' 
            })
            .then(res=>res.json())
            .then(data=>{
                    fetch('http://localhost:8010/api/v1/CarkilometerDetails/',{
                        headers:authHeader()
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        this.setState({Car_km_Details : data})
                    });
            });
        }
    
        render() {
        var FetchedData = this.state.Car_km_Details.map((Car_km_Detail, i)=>{
            return (
            <tr key={i}>
                <th scope="row">{i+1}</th>
                <td>{Car_km_Detail.vechicle}</td>
                <td>{Car_km_Detail.minkm}</td>
                <td>{Car_km_Detail.rateperkm}</td>
                <td>{Car_km_Detail.driverallowance}</td>
                <td>{Car_km_Detail.amount}</td>
                <td className="alignbutton">
                    <Link to={'updatecarkmdetail/'+Car_km_Detail.vechicleid}>
                        <Button variant="outline-primary" className="m-2"> Edit </Button>
                    </Link>
                    <Button variant="outline-danger" className="m-2" onClick={this.deleteCar_km_Detail.bind(this,Car_km_Detail.vechicleid)}>Delete</Button>
                </td>
            </tr>
            );
        })
    
        return (
        <div className="MainDiv main_carkmdetail ">
        <p className="carkm_ptag">Rate/KM is applied when Minimum KM limit exceeds !
            <Link to={'addnewcarkmdetails/'}>
                <Button variant="outline-primary" className="ml-3"> Add New Km Detail</Button>
            </Link>
        </p>

          <div className="carkmdetail">
            <Table responsive className="table table-striped ">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Vechicle</th>
                        <th scope="col">Minimun KM</th>
                        <th scope="col">Rate/KM</th>
                        <th scope="col">Driver Allowance</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Any Changes</th>
                    </tr>
                </thead>
                <tbody>  {FetchedData}  </tbody>
             </Table>
          </div>

        <p className="carkm_ptag">Tollgate, Parking and Other Expenses will be Extra !</p>
        
        <footer>
            <p>&copy; 2021 done by Chandru</p>
        </footer>

        </div>
        )
       }
    }
    
    
    {/* <td><button type="button" onClick={this.deleteCar_km_Detail.bind(this, Car_km_Detail._id)} className="btn btn-danger m-1"> Delete </button> */}
    {/* <button type="button" className="btn btn-warning m-1"> <Link to={'updateCarBookedData/' + Car_km_Detail.name}>Update</Link> </button> */}
    {/* </td> */}
    // 

      {/* <div className="row">
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                <img src={Carimg1}></img>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                <img src={Carimg2} ></img>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                <img src={Carimg3} ></img>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                <img src={Carimg4} ></img>
            </div>
        </div> */}

          // search(e){
        //     e.preventDefault();
        //     this.setState({displayAll:false})
        //     fetch('http://localhost:8010/api/v1/CarkilometerDetails/'+ this.searchinput.current.value,{
        //         headers:authHeader()
        //     })
        //     .then(res=>res.json())
        //     .then(data=>{
        //         this.setState({searchList : data})
        //     });   
        // }
     
        // allbooking(e){
        //     e.preventDefault();
        //     this.searchinput.current.value="";
        //     this.setState({displayAll:true});
        // }
     {/* <div className="bookinglist">
                    <form class="form-inline">
                    <h2>Local Package Booking List</h2>
                    <div class="form-group ml-auto">
                        <input type="text"  ref = {this.searchinput} className="form-control m-2 " id="inputsearch" placeholder="Search By User Id"/>
                    </div>
                    <button type="submit" className="btn btn-warning m-2" onClick={this.search.bind(this)}>Search</button>
                    <button type="submit" className="btn btn-secondary m-2" onClick={this.allbooking.bind(this)}>All Bookings</button>
                    </form>
                </div> */}