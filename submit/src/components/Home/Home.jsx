import React from 'react';
import { Card as MuiCard } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import SvgIcon from "@material-ui/core/SvgIcon";
import Divider from "@material-ui/core/Divider";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import { ReactComponent as EthereumLogo } from "../ethereum_logo.svg";
import Grid from "@material-ui/core/Grid";

const Home = ({ accountAddress, accountBalance, ID, name, URI, onsale, minter, owner,nowprice }) => {
    return (

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                
                     <Grid item key={ID}>

     
                     <MuiCard className={ID}>
                   <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={name}
                      height="240"
                      image={'https://ipfs.infura.io/ipfs/QmdNWFzAQhAuZ7YEX43RwK6HK63kZgb32DcE34bYYh6gPg'}
                      title={name}
                    />
                    <CardContent className={minter}>
                      <div className={ID}>
                        <Typography
                          className={"MuiTypography--heading"}
                          variant={"h5"}
                          gutterBottom
                        >
                          {name}
                        </Typography>
                        
                        <Typography variant="h6" className={1}>
                            <span>{accountAddress}</span>
                          </Typography>
                          
                          <Typography variant="h6" className={1}>
                            <SvgIcon
                              component={EthereumLogo}
                              viewBox="0 0 400 426.6"
                              titleAccess="ETH"
                            />
                            <span>{accountBalance}</span>
                          </Typography>
                      </div>
          
                    </CardContent>
                  </CardActionArea>
                </MuiCard>
                </Grid>   
                ))
            </Grid>
                    
               
            

     

      
    );
  };

export default Home;