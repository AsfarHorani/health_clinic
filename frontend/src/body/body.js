import React, { Fragment } from 'react';
import { Component } from 'react';
import { Switch,Route } from 'react-router';
import Appointments from '../Components/Dashboard/appointments';
import Doctors from '../Components/Dashboard/doctors';
import Prescriptions from '../Components/Dashboard/prescriptions';
import Toolbar from '../Components/Toolbar/Toolbar';

class Body extends Component{
state ={}
componentDidMount(){
    console.log("component did mount, [body]")
}

    render(){
      return(
           
            <Fragment>
             <Toolbar isAuth={this.props.isAuth} logout={this.props.logout} type={this.props.type}/>
              
              <Switch>
               <Route path="/active-doctors" exact render={()=><Doctors selectDocHandler={this.props.selectDocHandler}  token={this.props.token}/>} />  
              <Route path="/appointments"  render={()=><Appointments type={this.props.type} userId={this.props.userId}  token={this.props.token}/>} />  
              <Route render={()=> <Prescriptions userId={this.props.userId}  token={this.props.token}/> } />
              </Switch>
              </Fragment>
        )
    }
}



export default Body;