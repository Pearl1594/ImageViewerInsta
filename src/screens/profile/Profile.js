import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Header from "../../common/header/Header";






class Profile extends Component {



    render() {
        return (
            <div>
                <Header></Header>
                <Typography> This is profile page </Typography>
            </div>
        )
    }
}

export default Profile;