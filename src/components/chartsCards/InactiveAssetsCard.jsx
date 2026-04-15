import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';

export function InactiveCard({ inactiveWeek, inactiveMonth, inactiveYear }) {
  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card sx={{ height: '100%', width: '100%' }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          <Box>
            <Typography variant="overline">Inactive Assets</Typography>
            <Typography variant="h5">Not Recently Active</Typography>
            <Typography color="error">Week: {inactiveWeek.length}</Typography>
            <Typography color="warning.main">Month: {inactiveMonth.length}</Typography>
            <Typography color="success.main">Year: {inactiveYear.length}</Typography>
          </Box>

          <Box sx={{
            width: 80,
            height: 80,
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffebee',
            ml: 4,
          }}>
            <WarningIcon sx={{ fontSize: 40, color: '#d32f2f' }} />
          </Box>

        </CardContent>
      </Card>
    </Grid>
  );
}