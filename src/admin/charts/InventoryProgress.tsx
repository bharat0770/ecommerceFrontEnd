import React from "react";
import { LinearProgress, Typography, Box } from "@mui/material";

const InventoryProgress = ({ data }) => {
    return (
        <>
            <Box>
                {data.map(({ name, value }) => {
                    return (
                        <Box key={name} mb={2} display="flex" alignItems={"center"} justifyContent={"space-around"}>
                            <Typography variant="h6">{name}</Typography>
                            <LinearProgress variant="determinate" value={value}
                                sx={{ width: "50%", borderRadius: 5}}
                                />
                                <Typography variant="h6">{`${value}%`}</Typography>
                        </Box>
                    );
                })}
            </Box>
        </>
    );
};

export default InventoryProgress;