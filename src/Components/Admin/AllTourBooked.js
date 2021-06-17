import React, { Component } from 'react'
import authHeader from '../services/auth-header'
import Table from 'react-bootstrap/Table'

export default class AllTourBooked extends Component {
    constructor(){
        super();
        this.searchinput = React.createRef();
        this.state = {tourpreviousBookingList: [],searchList:[], displayAll:true}
    }

    componentDidMount(){
        fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/cartourbookedusers',{
            headers:authHeader()
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({tourpreviousBookingList: data})
            console.log(this.state.tourpreviousBookingList)
        });
    }

    search(e){
        e.preventDefault();
        this.setState({displayAll:false})
        fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/cartourbookedusers/'+ this.searchinput.current.value,{
            headers:authHeader()
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({searchList : data})
        });   
    }

    allbooking(e){
        e.preventDefault();
        this.searchinput.current.value="";
        this.setState({displayAll:true});
    }

    render() {
        if(this.state.displayAll){
            var display = this.state.tourpreviousBookingList
        }else{
            var display = this.state.searchList
        }

        console.log("length => ",display.length)

        if(!display.length){
            var FetchedData = "No Data Available !"
        }else{
            var FetchedData = display.map((previousBooking, i)=>{
                return (
                        <tr key={i}>
                            <th scope="row">{i+1}</th>
                            <td>{previousBooking.usernameid}</td>
                            <td>{previousBooking.name}</td>
                            <td>{previousBooking.phoneNumber}</td>
                            <td>{previousBooking.packagename}</td>
                            <td>{previousBooking.carType}</td>
                            <td>{previousBooking.noofdays}</td>
                            <td>{previousBooking.packageprice}</td>
                            <td>{previousBooking.packageDate}</td>
                        </tr>
                );
            })
        }
      

    return (
        <div className="MainDiv">
             <div className="bookinglist">
                <form class="form-inline">

                    <h2 className="col-12 col-sm-12 col-md-6 col-xl-6 heading-book">Tour Package Booked List</h2>

                    <div className="col-12 col-sm-12 col-md-6 col-xl-6">
                        <div class="form-group">
                            <input type="text"  ref = {this.searchinput} className="form-control m-2 " id="inputsearch" placeholder="Search By User Id" autocomplete="off"/>
                            <button type="submit" className="btn btn-warning m-2" onClick={this.search.bind(this)}>Search</button>
                            <button type="submit" className="btn btn-secondary m-2" onClick={this.allbooking.bind(this)}>All Bookings</button>
                        </div>
                    </div>

                </form>
            </div>

        <Table responsive className="table table-striped">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">User Id</th>
                    <th scope="col">Booked by</th>
                    <th scope="col">Phone No.</th>
                    <th scope="col">Package Name</th>
                    <th scope="col">Car Type</th>
                    <th scope="col">Days</th>
                    <th scope="col">Price</th>
                    <th scope="col">Booked Date</th>
                </tr>
            </thead>
            <tbody>
                {FetchedData}
            </tbody>
        </Table>
        </div>
    )
    }
}

