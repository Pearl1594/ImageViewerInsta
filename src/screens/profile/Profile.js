import React, { Component } from 'react';
import Header from "../../common/header/Header";
import './Profile.css'


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
        return (
            <div>
                {
                    this.state.username ?
                        <div className="top">
                            {/* Imports Header component and based on whether the user is logged in and the page that is being loaded the contents of Header is modified  */}
                            <Header profile_picture={this.state.profilePicture} showSearchBox={false} showProfileIcon={this.state.isLoggedIn ? true : false} showMyAccount={false} />
                        </div> : null
                }
             </div>
        )
    }

}

export default Profile;