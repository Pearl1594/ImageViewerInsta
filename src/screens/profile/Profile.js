import React, { Component } from 'react';
import Header from "../../common/header/Header";
import './Profile.css'
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
    fab: {
        margin: theme.spacing(1.5),
    }
})

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            profilePicture: "",
            username: "",
            fullname: "",
            noOfPosts: 0,
            follows: 0,
            followedBy: 0,
        }
    }

    componentDidMount() {
        sessionStorage.setItem("access-token", "8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
        if (this.state.isLoggedIn) {
            let resp = {};
            let data = null;
            let xhr = new XMLHttpRequest();
            let that = this;
            xhr.addEventListener("readystatechange", function () {
                if (xhr.readyState === 4) {
                    resp = JSON.parse(this.responseText).data;
                    that.setState({ profilePicture: resp["profile_picture"] });
                    that.setState({ username: resp["username"] });
                    that.setState({ noOfPosts: resp["counts"]["media"] });
                    that.setState({ follows: resp["counts"]["follows"] });
                    that.setState({ followedBy: resp["counts"]["followed_by"] });
                    that.setState({ fullname: resp["full_name"] });
                }
            });
            xhr.open("GET", this.props.baseUrl + "?access_token=" + window.sessionStorage.getItem('access-token'));

            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.send(data);
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {
                    this.state.username ?
                        <div className="top">
                            {/* Imports Header component and based on whether the user is logged in and the page that is being loaded the contents of Header is modified  */}
                            <Header profile_picture={this.state.profilePicture} showSearchBox={false} showProfileIcon={this.state.isLoggedIn ? true : false} showMyAccount={false} />
                            {this.state.isLoggedIn === true ?
                                <div className="flex-container">
                                    <div className="flex-container">
                                        <div className="left">
                                            <div className="profile-summary">
                                                <img className="profile-image" src={this.state.profilePicture} alt={this.state.fullName} />
                                            </div>
                                        </div>
                                        <div className="profile-summary-1">
                                            <Typography variant="h5" component="h5">{this.state.username}</Typography><br />
                                            <Typography>
                                                <span> Posts: {this.state.noOfPosts} </span>
                                                <span className="spacing" > Follows: {this.state.follows} </span>
                                                <span className="spacing"> Followed By: {this.state.followedBy} </span>
                                            </Typography>
                                            <Typography variant="h6" component="h6">
                                                <div className="top-spacing">{this.state.fullname}
                                                    <Fab color="secondary" aria-label="edit" className={classes.fab} >
                                                        <EditIcon onClick={this.openModalHandler} />
                                                    </Fab>
                                                </div>
                                            </Typography>
                                        </div>
                                    </div>
                                </div> : <Redirect to="/login" />
                            }
                        </div> : null
                }
            </div>
        )
    }

}

export default withStyles(styles)(Profile);