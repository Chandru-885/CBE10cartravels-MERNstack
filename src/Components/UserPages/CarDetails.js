import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import authHeader from '../services/auth-header'
import car1 from '../Assets/car21.png'
import car3 from '../Assets/car4.png'
import car2 from '../Assets/car5.png';
import car4 from '../Assets/toyato-6-1.png';
import car5 from '../Assets/car-6-seater.jpg';
import car6 from '../Assets/car-12-seater1.png';
import {Button,Card,Row,Container} from 'react-bootstrap' 

export default class CarDetails extends Component {
        constructor(){
            super();
            this.searchinput = React.createRef();
            this.state = {Car_km_Details: [], cargallery: [car1,car2,car3,car4,car5,car6], searchList:[], displayAll:true}
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
                                </tr>
                    );
                })
                var GalleryList = this.state.cargallery.map((cargalleryimage, i)=>{
                    return (
                        <div className="col-sm-12 col-md-4 col-xl-4">
                            <Card className="border-0 carimage" key={i}>
                                <Card.Img variant="top" src={cargalleryimage}/>
                            </Card>
                         </div>
                    );
                    })
    
        return (
        <div className="MainDiv">
            <div className="main_carkmdetail">
                <p className="carkm_ptag">Rate/KM is applied when Minimum KM limit exceeds !</p>
                <div className="carkmdetail">
                    <Table responsive className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Vechicle</th>
                                <th scope="col">Minimun KM</th>
                                <th scope="col">Rate/KM</th>
                                <th scope="col">Driver Allowance</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        <tbody>  {FetchedData}  </tbody>
                    </Table>
                </div>
                <p className="carkm_ptag">Tollgate, Parking and Other Expenses will be Extra !</p>
           </div>

        <p className="availabecars">Available Cars</p>
            <div class="row px-5 mb-5">
                {GalleryList} 
            </div>
        

        </div>
        )
       }
    }
    
    
    {/* <td><button type="button" onClick={this.deleteCar_km_Detail.bind(this, Car_km_Detail._id)} className="btn btn-danger m-1"> Delete </button> */}
    {/* <button type="button" className="btn btn-warning m-1"> <Link to={'updateCarBookedData/' + Car_km_Detail.name}>Update</Link> </button> */}
    {/* </td> */}
    // deleteCar_km_Detail(id){
    //     fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/carbookedusers/' + id, {
    //     headers:authHeader(),    
    //     method: 'DELETE' 
    //     })
    //     .then(res=>res.json())
    //     .then(data=>{
    //         console.log(data);
    //         this.setState({message: 'Record successfully deleted'})
    //             fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/carbookedusers/',{
    //                 headers:authHeader()
    //             })
    //             .then(res=>res.json())
    //             .then(data=>{
    //                 this.setState({Car_km_Details : data})
    //             });
    //     });
    // }

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
                      // if(this.state.displayAll){
            //     var display = this.state.Car_km_Details
            // }else{
            //     var display = this.state.searchList
            // }
    
            // console.log("length => ",display.length)
            // if(!display.length){
            //     var FetchedData = "No Data Available !"
            // }else{

              
        // search(e){
        //     e.preventDefault();
        //     this.setState({displayAll:false})
        //     fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/CarkilometerDetails/'+ this.searchinput.current.value,{
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