import React, { Component } from 'react'
import authHeader from '../services/auth-header'
import Table from 'react-bootstrap/Table'

export default class AllsignedUsers extends Component {
    constructor(){
        super();
        this.searchinput = React.createRef();
        this.state = {SignedUsers: [],searchList:[], displayAll:true}
    }
    componentDidMount(){
        fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/signedupuserdetails',{
            headers: authHeader()
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({SignedUsers: data})
            console.log("SignedUsers",this.state.SignedUsers)
        });
    }

    search(e){
        e.preventDefault();
        this.setState({displayAll:false})
        fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/signedupuserdetails/'+ this.searchinput.current.value,{
            headers:authHeader()
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({searchList : data})
            console.log("user",this.state.searchList)
        });   
    }

    allbooking(e){
        e.preventDefault();
        this.searchinput.current.value="";
        this.setState({displayAll:true});
    }

    render() {
        if(this.state.displayAll){
            var display = this.state.SignedUsers
        }else{
            var display = [this.state.searchList]
        }

        console.log("length => ",display.length)

        if(!display.length){
            var FetchedData = "No Data Available !"
        }else{
            var FetchedData = display.map((SignedUser, i)=>{
            if(i!==0){
                return (
                
                    <tr key={i}>
                        <th scope="row">{i+1}</th>
                        <td>{SignedUser.username}</td>
                        <td>{SignedUser.emailid}</td>
                        <td>{SignedUser.phonenumber}</td>
                        <td>{SignedUser.signeddate}</td>
                    </tr>
                 );
            }
          
            })
        }

    return (
        <div className="MainDiv">
                  <div className="bookinglist">
                <form class="form-inline">

                    <h2 className="col-12 col-sm-12 col-md-6 col-xl-6 heading-book">Signed Users</h2>

                    <div className="col-12 col-sm-12 col-md-6 col-xl-6">
                        <div class="form-group">
                            <input type="text"  ref = {this.searchinput} className="form-control m-2 " id="inputsearch" placeholder="Search By User Mail Id" autocomplete="off"/>
                            <button type="submit" className="btn btn-warning m-2" onClick={this.search.bind(this)}>Search</button>
                            <button type="submit" className="btn btn-secondary m-2" onClick={this.allbooking.bind(this)}>All Users</button>
                        </div>
                    </div>

                </form>
            </div>

        <Table responsive className="table table-striped">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    {/* <th scope="col">User Id</th> */}
                    <th scope="col">User Name</th>
                    <th scope="col">Email Id</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Date</th>
                    {/* <th scope="col">Delete User</th> */}
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

