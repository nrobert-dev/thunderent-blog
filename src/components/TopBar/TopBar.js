import React, {useState, useContext} from 'react';
import ImageMenu from "../ImageUploader/ImageMenu";
import Dropdown from "./Dropdown.js";
import {Link} from 'react-router-dom';
import BlogContext from "../../context/Context";
import {Container, MenuLink, Title} from "./Styling/TopBarStyling";
import {COLORS} from "../../utils/colors";
import * as mainLogo from "../../images/mainLogo.png";

import "../../index.css";
import 'font-awesome/css/font-awesome.min.css';
import { auth, provider } from '../../firebase/index';

const TopBar = (props) => { 
    const {state,dispatch} = useContext(BlogContext);
    const [imageMenuOpen, setImageMenuDisplayStatus] = useState(false); 
    
    const closeMenuModal = () => {
        setImageMenuDisplayStatus(false);
    }

    const login = () => { 
        auth.signInWithPopup(provider).then(user => {
            dispatch( {
                type:"LOGIN", 
                payload:{
                    userName: user.displayName,
                    isAdmin:false
                }});
            alert("Succesfully logged in!");        
        }).catch((error) => {
            alert("Could not log in!");
        })
    }

    const logOut = () => {
        dispatch({type:"LOGOUT"});
        auth.signOut().then(() => alert("Logged out! Have a nice day!"));
    }

    return(
        <> 
        <Container>
            <Link style={{display:"flex", textDecoration:"none"}} to="/">
                <img alt="Logo" id="mainLogo" src={mainLogo}></img>
                <Title>master of <span style={{color:'#f46e30'}}>SOME</span></Title>
            </Link>
            
            <div className="smallMenu">
                {props.loggedIn ? 
                    <> 
                    <i style={{color:COLORS.primary}} className="fa fa-user-circle" aria-hidden="true"></i> <span>Welcome, <span style={{color:COLORS.primary, fontWeight:'bold'}}>{state.loggedUserDisplayName}</span> </span> 
                    </> : <MenuLink style={{textDecoration:"none", fontSize:"18px", color:COLORS.primary}} onClick={login}><i className="fa fa-sign-in" aria-hidden="true"></i>Login</MenuLink>
                } 
                {props.loggedIn ? 
                    <Dropdown>
                        {props.isAdmin ?
                        <React.Fragment>
                            <MenuLink onClick={() => dispatch({type:"CREATE_POST"})}><Link style={{textDecoration:"none", color:"black"}} to="/dashboard/" ><i className="fa fa-plus-circle" aria-hidden="true"></i>Create Post</Link></MenuLink> 
                            <MenuLink onClick={() => setImageMenuDisplayStatus(true)}><i className="fa fa-picture-o" aria-hidden="true">Image Uploader</i></MenuLink>
                        </React.Fragment> : null}
                        <MenuLink onClick={() => logOut()} ><Link style={{textDecoration:"none", color:"black"}} to="/"><i style={{color:"red"}} className="fa fa-sign-out" aria-hidden="true">Logout</i></Link></MenuLink>
                    </Dropdown> : null
                }         
            </div>
        </Container>

        {imageMenuOpen ? <ImageMenu closeFunction={closeMenuModal}></ImageMenu> : null}
        
        </>
    );
}

export default TopBar;