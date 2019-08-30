import React,{Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Home from './home/Home';




class Controller extends Component{
    constructor(){
        super()
        this.baseUrl = "https://api.instagram.com/v1/users/self/";
    }

    render(){
        return(
            <Router>
                <div className = 'main-container'>
                    <Route path = '/home' render={(props) => <Home {...props} baseUrl = {this.baseUrl}/> }/>
                </div>
            </Router>
        )
    }
}

export default Controller;