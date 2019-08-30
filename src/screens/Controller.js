import React,{Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Home from './home/Home';
import Profile from './profile/Profile';
import Login from './login/Login';



//Creating controller class for easy routing the pages
class Controller extends Component{
    constructor(){
        super()
        this.baseUrl = "https://api.instagram.com/v1/users/self/"; //setting the baseUrl of the api 
    }

    render(){
        return(
            <Router>
                <div className = 'main-container'>
                    <Route path = '/home' render={(props) => <Home {...props} baseUrl = {this.baseUrl}/> }/>            {/* Route to home Page */ }
                    <Route path = '/profile' render={(props) => <Profile {...props} baseUrl = {this.baseUrl}/>}/>       {/* Route to profile Page */ }
                    <Route path = '/login' render={(props) => <Login {...props} baseUrl = {this.baseUrl}/>}/>           {/* Route to login Page */ }
                </div>
            </Router>
        )
    }
}

export default Controller;