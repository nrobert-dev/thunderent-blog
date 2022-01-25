import React from "react";
import * as profilePic from "../../images/me.jpg";

import {AuthorContainer, AuthorImage, AuthorName} from "./Styling/styles";

const AuthorCard = () => {
    return(
    <AuthorContainer>
        <AuthorImage src={profilePic}></AuthorImage>
        <AuthorName>Robert N</AuthorName>
        <p><small>Hi, I'm Robert and I currently work as a Front-End Technical Lead. What can you find here? Some of my various experiments, science, tech, coding, the occasional digital art. Learning and sharing is cool, mkay?</small></p>
    </AuthorContainer>
    )
};

export default AuthorCard;