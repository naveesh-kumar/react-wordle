import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faQuora } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css"


const Footer = () =>{
  return (
    <div className="footer-container">
      <div>
      <a href="https://www.linkedin.com/in/naveesh-kumar-v-162476117/" target="blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
      <a href="https://github.com/naveesh-kumar" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
      <a href="https://www.quora.com/profile/Naveesh-Kumar-V" target="blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faQuora} /></a>
      </div>
      <div>
        @2022 | My wordle game | Naveesh Kumar V
      </div>
    </div>
  )
}

export default Footer;