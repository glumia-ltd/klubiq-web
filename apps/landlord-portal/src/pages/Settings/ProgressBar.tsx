// ProgressWithWarning.tsx
import React from "react";
import { Card, LinearProgress, Typography,Box } from "@mui/material";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
interface ProgressBarProps {
    label: string;
    value: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ label, value }) => {
    return (
        <Box sx={{ mb: 3 }}>
            <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontWeight: 500, mb: 1 }}
            >
                {label}
            </Typography>
            <LinearProgress
                variant="determinate"
                value={value}
                sx={{
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: "#E5E7EB",
                    "& .MuiLinearProgress-bar": {
                        backgroundColor: "#0A2540", // navy blue bar
                    },
                }}
            />
        </Box>
    );
};

const ProgressWithWarning: React.FC = () => {
    return (
        <Card
            sx={{
                p: 2,
                width: "100%",
                gap: 2
            }}
        >
            <Typography variant='h4' mb={2}>Current Plan</Typography>

            <ProgressBar label="Storage" value={85} />
            <ProgressBar label="API Calls" value={95} />
            <ProgressBar label="Projects" value={65} />

            <Box
                sx={{
                    mt: 2,
                    bgcolor: "#FDF2F4",
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    p:0.5
                }}
            >
                <ReportProblemIcon sx={{ color: "#B42318 ",fontSize:15 }} />
                <Typography variant="caption" color="#B42318">
                    You are nearing your limits. Consider upgrading.
                </Typography>

            </Box>
        </Card>
    );
};

export default ProgressWithWarning;
