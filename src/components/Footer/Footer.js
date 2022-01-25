import React from "react";
import {COLORS} from "../../utils/colors";
import {FooterContainer, FooterSection} from "./Styling/styles";

const Footer = () => {
    return(
        <FooterContainer>
            <FooterSection>
                <h2>master of <span style={{color : COLORS.primary}}>SOME</span></h2>
            </FooterSection>
            <small style={{color:"gray"}}>Robert {new Date().getFullYear()}. Bunnies are awesome, don't you think so?</small>
        </FooterContainer>
    )
}

export default Footer;