import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import Grid from "@material-ui/core/Grid";

const Marketplace = ({
    NFTs,
    NFTCount,
}) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (NFTs.length !== 0) {
            if (NFTs[0].metaData !== undefined) {
                setLoading(loading);
            }
            else {
                setLoading(false);
            }
        }
    }, [NFTs]);

    return (
        <div>
            <div className="card mt-1">
                <div className="card-body align-items-center d-flex justify-content-center">
                    <h5>
                        All NFTs
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
                {NFTs.map((NFT)  => (
                    <Grid item key={NFT.ID}>
                    <Card {...NFT} />
                    </Grid>
                ))}
            </Grid>
                    
               
            
        </div>
    )
}

export default Marketplace;