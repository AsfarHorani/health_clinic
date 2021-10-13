import React, { Fragment } from 'react';
import { Component } from 'react';
import { Switch,Route } from 'react-router';
import Doctors from '../Components/Dashboard/doctors';
import Patients from '../Components/Dashboard/patients';
import Toolbar from '../Components/Toolbar/Toolbar';

class Body extends Component{
state ={}
componentDidMount(){
    console.log("component did mount, [body]")
}

    render(){
      return(
           
            <Fragment>
             <Toolbar type={this.props.type}/>
            
              <Switch>
              <Route path="/my-patients"  exact render={()=><Patients  />} />   
              <Route path="/active-doctors" exact render={()=><Doctors  />} />  
              {/* <Route path="/my-prescriptions" exact render={()=><patientsDB  />}/>    */}
              </Switch>
              </Fragment>
        )
    }
}



export default Body;