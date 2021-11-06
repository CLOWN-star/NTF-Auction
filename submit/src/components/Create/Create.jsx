import React , { useState,useCallback }from 'react';
import {create} from 'ipfs-http-client';
import { TextField } from '@material-ui/core';
import { useStyles } from "./styles.js";
import { useSelector } from "react-redux";
import DropZone from "../../components/DropZone";
import {useDropzone} from 'react-dropzone';
import { Link} from "react-router-dom";
import CancelOutlinedIcon  from "@material-ui/icons/CancelOutlined";
import Button from "@material-ui/core/Button";


import NFTAuction from "../../build/contracts/NFTAuction.json";



var name;
var desc;

const Create = () => {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState();
    

    let state = {
        NFTName: "",
        tokenURI: '',
        buffer: null,  //Data to be sent to ipfs
    }


    async function  createNFT(event){
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const AuctionContract = new web3.eth.Contract(
            NFTAuction.abi,
            NFTAuction.networks[networkId].address
        );
        event.preventDefault();
        console.log("Submitting file to IPFS");
        var file = localStorage.getItem("sefile");
        let tokenURI = `https://ipfs.infura.io/ipfs/${file}`;
        console.log(tokenURI);
        state.tokenURI = tokenURI;
        //alert(state.NFTName);
        AuctionContract.methods.mintNFT(name, tokenURI, desc).send({ from: accounts[0] });
        console.log("Name:"+state.NFTName);
    }

    
    
    return (
        <div className={classes.pageCreateNft}>
            <form>
                <div className={classes.formHeader}>
                    <h1>Create collectible</h1>
                    <Link to="/">
                        <CancelOutlinedIcon fontSize="large" />
                    </Link>
                </div>
                <div className={classes.content}>
                    <div className={classes.dropzone}>
                         <DropZone onFileUploaded={setSelectedFile} />
                    </div>
                    <fieldset>
                        <TextField
                        label="Title"
                        name="title"
                        variant="filled"
                        required
                        onChange={(e) =>
                            name = e.target.value
                        }
                        fullWidth
                        />
                        <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        label="Description"
                        name="Description"
                        variant="filled"
                        required   
                        onChange={(e) =>
                            desc = e.target.value
                        }               
                        fullWidth
                        />

                        <Button variant="contained" color="primary" onClick={createNFT}>
                            Submit
                        </Button>
                    </fieldset>
                </div>
            </form>          
        </div>
        )
    };

export default Create;

