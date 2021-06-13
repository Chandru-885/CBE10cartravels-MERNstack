import React, { Component } from 'react'
import authHeader from '../services/auth-header'
import AuthService from '../services/auth'
import Table from 'react-bootstrap/Table'

export default class UserBookingList extends Component {
    constructor(){
        super();
        this.state = {previousBookingList: []}
    }

    componentDidMount(){
        var Userid  =  AuthService.finduserid();
        fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/carbookedusers/'+ Userid,{
            headers:authHeader()
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({previousBookingList : data})
        });
    }

    deletepreviousBooking(id){
        fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/carbookedusers/' + id, {
        headers:authHeader(),    
        method: 'DELETE' 
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.setState({message: 'Record successfully deleted'})
            var Userid  =  AuthService.finduserid();
                fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/carbookedusers/'+ Userid,{
                    headers:authHeader()
                })
                .then(res=>res.json())
                .then(data=>{
                    this.setState({previousBookingList : data})
                });
        });
    }

    render() {
        console.log("length => ",this.state.previousBookingList.length )
        if(!this.state.previousBookingList.length){
            var previousBookingDataList = "Not yet Booked any travel !"
        }else{
            var previousBookingDataList = this.state.previousBookingList.map((previousBooking, i)=>{
                return (
                        <tr key={i}>
                            <th scope="row">{i+1}</th>
                            <td>{previousBooking.user_name}</td>
                            <td>{previousBooking.phoneNumber}</td>
                            <td>{previousBooking.FromLocation}</td>
                            <td>{previousBooking.ToLocation}</td>
                            <td>{previousBooking.DateTime}</td>
                            <td><button type="button" onClick={this.deletepreviousBooking.bind(this, previousBooking._id)} className="btn btn-danger m-1"> Delete </button>
                                {/* <button type="button" className="btn btn-warning m-1"> <Link to={'updateCarBookedData/' + previousBooking.name}>Update</Link> </button> */}
                            </td>
                        </tr>
                );
            })
        }
    return (
        <div className="MainDiv">
        <h1 className="bookinglist">Local Package Booking List</h1>
        <Table responsive className="table table-striped">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone No.</th>
                    <th scope="col">Pick Up</th>
                    <th scope="col">Drop</th>
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

