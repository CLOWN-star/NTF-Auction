import React from "react";
import {useState} from 'react';
import { TextField } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import web3 from "web3";
import Button from "@material-ui/core/Button";
import NFTAuction from "../../build/contracts/NFTAuction.json";
import Dialog from '@material-ui/core/Dialog'
import { Link} from "react-router-dom";

var price_s = 0;
var price_n = 0;
var dura_s = 0;



var test = window.location.href;
let index = test.lastIndexOf("\/");
let str = test.substring(index + 1,test.length);

const Detailowner = ({
    NFTs,
    ownertimes

}) =>{
   
    async function  ownertimes(ID, time){
        
        const web3 = window.web3;
        const networkId = await web3.eth.net.getId();
        const AuctionContract = new web3.eth.Contract(
            NFTAuction.abi,
            NFTAuction.networks[networkId].address
        );
        let result = 1;
        alert(result)
        return (
            <div> {result}</div>
           
        )
    }

    return(
        <div>
           {NFTs.map((NFT) => {
               if(NFT.ID == str)
                    for( let i = 0;i<=1;i++){
                                ownertimes(NFT.ID ,i)
                           
                    }     
                })}
        
        </div>
    )

};

export default Detailowner;
