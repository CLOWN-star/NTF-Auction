import React, { useState, useEffect } from "react";
import Card from "../Card";
import Grid from "@material-ui/core/Grid";

const MyTokens = ({
    accountAddress,
    NFTs,
    NFTNumOfAccount
  }) => {
    const [loading, setLoading] = useState(false);
    const [myNFTs, setMyNFTs] = useState([]);
  
    useEffect(() => {
      if (NFTs.length !== 0) {
        if (NFTs[0].metaData !== undefined) {
          setLoading(loading);
        } else {
          setLoading(false);
        }
      }
      const myNFTs = NFTs.filter(
        (NFT) => NFT.owner === accountAddress
      );
      setMyNFTs(myNFTs);
    }, [NFTs]);
  
    return (
      <div>
        <div className="card mt-1">
          <div className="card-body align-items-center d-flex justify-content-center">
            <h5>
              Your NFTs
            </h5>
          </div>
        </div>
        <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                {myNFTs.map((NFT)  => (
                    <Grid item key={NFT.ID}>
                    <Card {...NFT} />
                    </Grid>
                ))}
            </Grid>
      </div>
    );
  };
  
  export default MyTokens;