import React from 'react';
import { Container } from 'react-bootstrap';
import {Bar,Line, Pie, PolarArea, Radar} from 'react-chartjs-2';
import authHeader from '../services/auth-header';

export default class Chart extends React.Component {
  constructor(){
    super();{
      this.state = {labeldata : [], localbooked : [], outstationbooked : []}
    }
  }

  componentDidMount(){
    var localbooking = []
    var outstationbooking = []
    var localuserid = []
    var touruserid  = []

    fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/carbookedusers',{
            headers:authHeader()
        })
        .then(res=>res.json())
        .then(data=>{ localbooking = data
            
            fetch('https://cbe10-cartravels-chandru.herokuapp.com/api/v1/cartourbookedusers',{
                headers:authHeader()
              })
              .then(res=>res.json())
              .then(data=>{ outstationbooking = data
  
                for(let i in localbooking){
                    let temp = localbooking[i]
                    localuserid.push(temp["usernameid"])
                }

                for(let i in outstationbooking){
                  let temp = outstationbooking[i]
                  touruserid.push(temp["usernameid"])
                }
               
                var tour_and_local_userid = [...new Set(localuserid.concat(touruserid))]
                this.setState({labeldata : tour_and_local_userid})

                var localUserIdCount = localuserid.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
                var TourUserIdCount  = touruserid.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});

                var localuserdata = []
                for(let i in tour_and_local_userid){
                  let temp = localUserIdCount[tour_and_local_userid[i]]
                  if(temp){
                    localuserdata.push(temp)
                  }else{
                    localuserdata.push(0)
                  }
                }
                this.setState({localbooked : localuserdata})

                var Touruserdata = []
                for(let i in tour_and_local_userid){
                  let temp = TourUserIdCount[tour_and_local_userid[i]]
                  if(temp){
                    Touruserdata.push(temp)
                  }else{
                    Touruserdata.push(0)
                  }
                }
                this.setState({outstationbooked : Touruserdata})

                console.log(this.state.labeldata,this.state.localbooked,this.state.outstationbooked)
            })
        })
    }

  render() {
    return (
      <div>
        <Container className="chart">
          <p className="carkm_ptag">Bookings by users</p>
        <Bar
          // data={state}
          data = {{
            labels: this.state.labeldata,
            // labels : ["chandru","lakshmanan","chandru lakshmanan","chandru","lakshmanan","chandru lakshmanan","chandru","lakshmanan","chandru lakshmanan","chandru","lakshmanan","chandru lakshmanan"],
            datasets: [
              {
                label: 'LocalBookings',
                backgroundColor: 'rgb(193, 247, 242)',
                borderColor: 'rgba(15, 214, 196)',
                borderWidth: 1,
                borderRadius: 5,
                hoverBorderWidth : 3,
                hoverBorderColor : 'rgba(122, 196, 181)',
                data: this.state.localbooked
                // data : [3,1,2,4,5,1,0,9,1,2,1,4]
              },
              {
              label: 'OutstationBookings',
              backgroundColor: 'rgb(255, 198, 158)',
              borderColor: 'rgba(237, 148, 85)',
              hoverBorderColor : 'rgba(255, 156, 87)',
              borderWidth: 1,
              hoverBorderWidth : 3,
              borderRadius: 5,
              data: this.state.outstationbooked
              // data : [2,1,4,0,2,2,4,5,1,0,9,1]
              }
            ]
          }}
        />
        </Container>

      </div>
    );
  }
}


