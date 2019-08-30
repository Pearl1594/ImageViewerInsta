import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import profileImage from "../../assets/upgrad.svg"
import { MenuList } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import "./Header.css";

const styles = (theme => ({
    menuItems:{
        "text-decoration": "none",
        "color": "black",
        "text-decoration-underline":"none",
    },
    searchText:{
        "position": "relative",
        "width": "100%",
    },
    menuList:{
        "width": "150px",
        padding:"0px"

    }

}))



class Header extends Component {
    constructor() {
        super();
        this.state = {
            menuIsOpen: false,
        };

    }
    openMenu = () => this.setState({
        ...this.state,
        menuIsOpen: !this.state.menuIsOpen
    })
    profileButtonClicked = (event) => {
        this.state.anchorEl ? this.setState({ anchorEl: null }) : this.setState({ anchorEl: event.currentTarget });
        this.openMenu();
    };
    onSearchChangeHandler = (event) => {
        //this.props.onSearchTextChange(event.target.value);
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <header className="app-header">
                    <a href='/home' id="app-logo">Image Viewer</a>

                    <span className="header-searchbox">
                        <SearchIcon id="search-icon"></SearchIcon>
                        <Input className={classes.searchText} placeholder="Search…" disableUnderline={true} onChange={this.onSearchChangeHandler}/>
                    </span>
                    <span>
                        <IconButton id="profile-icon" onClick={event => this.profileButtonClicked(event)}>
                            <img src={profileImage} alt = {profileImage} id="profile-picture" />
                        </IconButton>
                        <Menu id="profile-menu" anchorEl={this.state.anchorEl} open={this.state.menuIsOpen} onClose={this.profileButtonClicked}>
                            <MenuList className={classes.menuList}>
                         <Link to={"/profile/"} className={classes.menuItems} underline="none" color = {"default"}>
                            <MenuItem className = {classes.menuItems} onClick={this.onMyAccountClicked} disableGutters = {false}>My account</MenuItem>
                         </Link>
                            <div className = "horizontal-line"> </div>
                            <MenuItem className = "menu-items" onClick={this.profileButtonClicked}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </span>

                </header>

            </div>


        )
    }


}

export default withStyles(styles)(Header);