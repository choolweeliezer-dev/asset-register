import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import BuildIcon from '@mui/icons-material/Build';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export function MaintenanceCard({ maintWeek, maintMonth, maintYear }) {
  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card sx={{ height: '100%' }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          <Box>
            <Typography variant="overline">Maintenance</Typography>
            <Typography variant="h5">Upcoming Service</Typography>
            <Typography color="error"> {maintWeek.length}</Typography>
            <Typography color="warning.main">Call for maintenance</Typography>
           {/*} <Typography color="warning.main">Month: {maintMonth.length}</Typography>
            <Typography color="success.main">Year: {maintYear.length}</Typography> */}
            <Button 
             size="small"
             component={Link}
             to = ""
            >
              View full history →
            </Button>
          </Box>

          <Box sx={{
            width: 80,
            height: 80,
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(180deg,  #d1612eca, #f3661b)',
            ml: 4,
          }}>
            <BuildIcon sx={{ fontSize: 40, color: '#f7f4f2' }} />
          </Box>

        </CardContent>
      </Card>
    </Grid>
  );
}