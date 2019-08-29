import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Header from "../../common/header/Header";



class Login extends Component {



    render() {
        return (
            <div>
                <Header></Header>
                <Typography> This is Login page </Typography>
            </div>
        )
    }
}

export default Login;