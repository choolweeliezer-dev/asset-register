import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import PaymentsIcon from '@mui/icons-material/Payments';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export function SubscriptionCard({ subWeek, subMonth, subYear }) {
  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card sx={{ height: '100%' }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          <Box>
            <Typography variant="overline">Subscriptions Due</Typography>
            <Typography variant="h5">Upcoming Payments</Typography>
            <Typography>Week: {subWeek.length}</Typography>
            <Typography>Month: {subMonth.length}</Typography>
            <Typography>Year: {subYear.length}</Typography>
          </Box>

          <Box sx={{
            width: 80,
            height: 80,
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#e3f2fd',
            ml: 4,
          }}>
            <AttachMoneyIcon sx={{ fontSize: 40, color: '#1976d2' }} />
          </Box>

        </CardContent>
      </Card>
    </Grid>
  );
}