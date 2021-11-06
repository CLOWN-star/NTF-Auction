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


const Detail = ({
    NFTs,
    accountAddress,
    NFTCount,
    NFTContract,
    Auctions,

}) =>{
    var test = window.location.href;
    let index = test.lastIndexOf("\/");
    let str = test.substring(index + 1,test.length);

    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    
    

    async function  start( ID,  start, time, accountAddress){

        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const AuctionContract = new web3.eth.Contract(
            NFTAuction.abi,
            NFTAuction.networks[networkId].address
        );
        AuctionContract.methods.startAuction(ID, start, time).send({ from: accountAddress, gas: '3000000'}).on("confirmation", () => {
            window.location.reload();
        });

    }

    async function  testend(ID, time,accountAddress){
        var d = new Date();
        if(time*1000>d.getTime()){
            return;
        }
        const web3 = window.web3;
        const networkId = await web3.eth.net.getId();
        const AuctionContract = new web3.eth.Contract(
            NFTAuction.abi,
            NFTAuction.networks[networkId].address
        );
        AuctionContract.methods.endAuction(ID).send({ from: accountAddress, gas: '3000000'}).on("confirmation", () => {
            window.location.reload();
        });
        alert("already ended");
    }

    async function  bid(ID, money,accountAddress){

        const web3 = window.web3;
        const networkId = await web3.eth.net.getId();
        const AuctionContract = new web3.eth.Contract(
            NFTAuction.abi,
            NFTAuction.networks[networkId].address
        );
        AuctionContract.methods.bidNFT(ID,money).send({ from: accountAddress, gas: '3000000'}).on("confirmation", () => {
            window.location.reload();
        });
    }

    async function  claimd(ID,accountAddress){

        const web3 = window.web3;
        const networkId = await web3.eth.net.getId();
        const AuctionContract = new web3.eth.Contract(
            NFTAuction.abi,
            NFTAuction.networks[networkId].address
        );
        AuctionContract.methods.claimNFT(ID,).send({ from: accountAddress, gas: '3000000'}).on("confirmation", () => {
            window.location.reload();
        });
    }


    //时间戳转换方法    date:时间戳数字
    function formatDate(date) {
        var date = new Date(date*1000);  
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD +" "+hh + mm + ss;
    }
   
    return(
        <div>
           {NFTs.map((NFT) => {
               if(NFT.ID == str)
                    return (
                        <div>
                            <section>
                                <Grid container 
                                    spacing={0} 
                                    alignItems="center"
                                    justify="center"
                                >
                                
                                <Grid item md={5} sm={5} xs={12}>
                                    <fieldset>

                                    <h1>{NFT.ID}</h1>

                                    <  figure> 
                                    <   img className="ui fluid image" src={NFT.URI} />
                                    </figure>

                                    <TextField
                                        label="Name"
                                        name="Name"
                                        variant="filled"
                                        margin="dense"
                                        fullWidth
                                        disabled
                                        defaultValue={
                                            NFT.name
                                        }
                                    />

                                    <TextField
                                        label="Desc"
                                        name="Desc"
                                        variant="filled"
                                        margin="dense"
                                        fullWidth
                                        disabled
                                        defaultValue={
                                            NFT.description
                                        }
                                    />

                                    <TextField
                                        label="Creater"
                                        name="Creater"
                                        variant="filled"
                                        disabled
                                        fullWidth
                                        margin="dense"
                                        defaultValue={NFT.minter}
                                    />

                                    <TextField
                                        label="Owner"
                                        name="Owner"
                                        variant="filled"
                                        disabled
                                        fullWidth
                                        margin="dense"
                                        defaultValue={NFT.owner}
                                    />

                                   
                                     
                                    { NFT.onsale && (  //结束时间
                                        
                                        <TextField
                                            label="endtime"
                                            name="endtime"
                                            variant="filled"
                                            disabled
                                            fullWidth
                                            margin="dense"
                                            defaultValue={formatDate(parseInt(NFT.endtime))}
                                        />
                                        
                                    )}

        

                                    { NFT.onsale && (  //价格
                                        <TextField
                                            label="price"
                                            name="price"
                                            variant="filled"
                                            disabled
                                            fullWidth
                                            margin="dense"
                                            defaultValue={NFT.nowprice}
                                        />  
                                    )}

                                    {NFT.owner === accountAddress && !NFT.onsale && (       //出售
                                       <div >                             
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => 
                                                {
                                                    setOpen(!open)
                                                   
                                                }
                                            }
                                        >
                                        Sell
                                        </Button>
                                        <header className='App-header'>
                                            <Dialog open={open}>
                                           
                                                <TextField
                                                    label="startprice"
                                                    name="startprice"
                                                    variant="filled"
                                                    onChange={(e) =>
                                                        price_s = e.target.value
                                                    }
                                                    fullWidth
                                                    margin="dense"
                                                    defaultValue={0}
                                                />

                                                <TextField
                                                    label="duration"
                                                    name="duration"
                                                    variant="filled"
                                                    onChange={(e) =>
                                                        dura_s = e.target.value
                                                    }
                                                    fullWidth
                                                    margin="dense"
                                                    defaultValue={0}
                                                />

                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => 
                                                        {
                                                            setOpen(!open)
                                                            start(NFT.ID,price_s,dura_s,accountAddress)
                                                        }
                                                    }
                                                >出售</Button>

                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => 
                                                        {
                                                            
                                                            setOpen(!open)
                                                        }
                                                    }
                                                >取消</Button>
                                                
                                            </Dialog>
                                        </header>
                                        </div>
                                    )}

                                    {NFT.owner === accountAddress && NFT.onsale && (       //结束
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => 
                                                {
                                                    alert(NFT.bidder)
                                                    testend(NFT.ID,NFT.endtime,accountAddress)
                                                }
                                            }
                                        >
                                        Showbidder
                                        </Button>
                                    )}

                                    {NFT.owner !== accountAddress && NFT.onsale && (   //竞价
                                        <div>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => 
                                                {
                                                    setOpen1(!open1)
                                                }
                                            }
                                        >
                                        Bid
                                        </Button>
                                        
                                            <header className='App-header'>
                                                <Dialog open={open1}>
                                            
                                                    <TextField
                                                        label="startprice"
                                                        name="startprice"
                                                        variant="filled"
                                                        onChange={(e) =>
                                                            price_n = e.target.value
                                                        }
                                                        fullWidth
                                                        margin="dense"
                                                        defaultValue={NFT.nowprice}
                                                    />

                                                    
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => 
                                                            {
                                                                setOpen1(!open1)
                                                                bid(NFT.ID,price_n,accountAddress)
                                                            }
                                                        }
                                                    >竞价</Button>

                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => 
                                                            {
                                                                
                                                                setOpen1(!open1)
                                                            }
                                                        }
                                                    >取消</Button>
                                                    
                                                </Dialog>
                                            </header>
                                           
                                    </div>
                                    )}

                                    {NFT.bidder === accountAddress && !NFT.onsale && !NFT.claim &&(   //认领
                                        
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => 
                                                {
                                                    claimd(NFT.ID,accountAddress)   
                                                }
                                            }
                                        >
                                        Claim
                                        </Button>
                                    )}                        
                                    </fieldset>
                                </Grid>
                                </Grid>
                            </section>
                        </div>




                    )
                })}
        
        </div>
    )

};

export default Detail;
