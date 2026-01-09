import React from 'react';
import { FaHeart, FaGithub, FaLinkedin, FaBehance } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-top">
            <div className="footer-brand">
              <h2 className="footer-logo">CardioShield AI</h2>
              <p className="footer-tagline">Advanced Heart Health Diagnostics</p>
            </div>
            
            <div className="footer-socials">
                <a href="https://github.com/vidisha2946" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Github"><FaGithub /></a>
                <a href="https://www.linkedin.com/in/vidisha-bhagiya-6144522a5/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn"><FaLinkedin /></a>
                <a href="https://www.behance.net/vidishabhagiya1" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Behance"><FaBehance /></a>
            </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
            <p className="copyright">
                &copy; {new Date().getFullYear()} CardioShield AI. All rights reserved.
            </p>
            <div className="made-with">
                Made with <FaHeart className="heart-icon" /> by <span className="author-name">Vidisha Bhagiya</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
