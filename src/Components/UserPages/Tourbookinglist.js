import React, { Component } from 'react'
import authHeader from '../services/auth-header';
import AuthService from '../services/auth'
import Table from 'react-bootstrap/Table'

export default class Tourbookinglist extends Component {
    constructor(){
        super();
        this.state = {tourpreviousBookingList: []}
    }

    componentDidMount(){
        var Userid  =  AuthService.finduserid();
        fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/cartourbookedusers/'+ Userid,{
            headers:authHeader()
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({tourpreviousBookingList: data})
            console.log(this.state.tourpreviousBookingList)
        });
    }

    deletepreviousBooking(_id){
        console.log("tourdeleteid",_id)
        fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/cartourbookedusers/' + _id, {
            headers:authHeader(),
            method: 'DELETE'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            var Userid  =  AuthService.finduserid();
            fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/cartourbookedusers/'+Userid,{
                headers:authHeader()
            })
            .then(res=>res.json())
            .then(data=>{
                this.setState({tourpreviousBookingList: data})
                console.log(this.state.tourpreviousBookingList)
            });
        });
    }
    render() {
        console.log("length => ",this.state.tourpreviousBookingList.length)
        if(!this.state.tourpreviousBookingList.length){
            var previousBookingDataList = "Not yet Booked any travel !"
        }else{
            var previousBookingDataList = this.state.tourpreviousBookingList.map((previousBooking, i)=>{
                return (
                        <tr key={i}>
                            <th scope="row">{i+1}</th>
                            <td>{previousBooking.name}</td>
                            <td>{previousBooking.phoneNumber}</td> 
                            <td>{previousBooking.packagename}</td>
                            <td>{previousBooking.carType}</td>
                            <td>{previousBooking.noofdays}</td>
                            <td>{previousBooking.packageprice}</td>
                            <td>{previousBooking.packageDate}</td>
                            <td>
                                <button type="button" onClick={this.deletepreviousBooking.bind(this, previousBooking._id)} className="btn btn-danger m-1"> Delete </button>
                                {/* <button type="button" className="btn btn-warning m-1"> <Link to={'updateCarBookedData/' + previousBooking.name}>Update</Link> </button> */}
                            </td>
                        </tr>
                );
            })
        }
    
    return (
        <div className="MainDiv">
        <h1 className="bookinglist">Tour Package Booking List</h1>
        <Table responsive className="table table-striped">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Booked by</th>
                    <th scope="col">Phone No</th>
                    <th scope="col">Package Name</th>
                    <th scope="col">Car Type</th>
                    <th scope="col">Days</th>
                    <th scope="col">Price</th>
                    <th scope="col">Booked Date</th>
                    <th scope="col">Any changes</th>
                </tr>
            </thead>
            <tbody>
                {previousBookingDataList}
            </tbody>
        </Table>
        </div>
    )
   }
}

