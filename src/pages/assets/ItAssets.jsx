import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ITAssetsTable from '../../components/dashboard/assets/ITAssetsTable'; 
import { assetsMock } from '../../components/dashboard/data/assetsMock';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


export default function ItAssets() {
  const itAssets = assetsMock.filter(
    (asset) => asset.type === 'it'
  );
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h5"
  sx={{
    mb: 2,
    fontWeight: 700,
    letterSpacing: 0.5,
    fontFamily: 'Inter, sans-serif',
  }}>
        IT Assets Register
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
    <Button startIcon={<AddIcon />} variant="contained" onClick={() => navigate("/add-asset")}>
      Add Asset
    </Button>
  </Box>
      <ITAssetsTable rows={itAssets} />
    </Box>
  );
}