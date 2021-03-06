import React from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";

import { Card as MuiCard } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import SvgIcon from "@material-ui/core/SvgIcon";
import Divider from "@material-ui/core/Divider";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";

import { useStyles } from "./styles.js";
import { ReactComponent as EthereumLogo } from "../ethereum_logo.svg";

const Card = ({ ID, name, URI, onsale, minter, owner,nowprice }) => {
  const classes = useStyles();
  console.log("image: ", URI);
  return (
    <Link to={`/nft/${ID}`}>
      <MuiCard className={classes.ID}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={name}
            height="240"
            image={URI}
            title={name}
          />
          <CardContent className={classes.minter}>
            <div className={classes.ID}>
              <Typography
                className={"MuiTypography--heading"}
                variant={"h5"}
                gutterBottom
              >
                {name}
              </Typography>
              
                <Chip
                  size='medium'
                  label= { onsale ?  'selling' : 'not selling' }
                  color =  { onsale ?  'primary' : 'success' }
                />
               
             

            </div>
           

            <Typography variant="h6" className={classes.price}>
              <SvgIcon
                component={EthereumLogo}
                viewBox="0 0 400 426.6"
                titleAccess="ETH"
              />
              {nowprice}
            </Typography>
            <Divider className={classes.divider} light />
            <Typography
              variant={"body1"}
              align={"center"}
              className={owner}
            >
              {owner.slice(0, 7)}...{owner.slice(-4)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </MuiCard>
     </Link>
  );
};

export default Card;
