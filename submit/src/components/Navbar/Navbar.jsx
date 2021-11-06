import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    

    <nav className="navbar navbar-expand-lg ">
      
      <div className="container">
        <Link to="/" className="navbar-brand ml-2">
          NFT ART markrt
        </Link>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNav" className="collapse navbar-collapse">
          
            
              <Link to="/marketplace" className="nav-link">
                AuctionNFT
              </Link>
            
            
              <Link to="/create" className="nav-link">
                MintNFT
              </Link>
            
           
              <Link to="/my-tokens" className="nav-link">
                MyNFT
              </Link>
            
            
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
