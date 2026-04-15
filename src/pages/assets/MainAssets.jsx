import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import MainAssetsTable from '../../components/dashboard/assets/MainAssetsTable';
import { assetsMock } from '../../components/dashboard/data/assetsMock';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function MainAssets() {
  const mainAssets = assetsMock.filter(
    (asset) => asset.type === 'main'
  );
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Main Assets Register
      </Typography>

       <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
    <Button startIcon={<AddIcon />} variant="contained" onClick={() => navigate("/add-asset")}>
      Add Asset
    </Button>
  </Box>
      <MainAssetsTable rows={mainAssets} />
    </Box>
  );
}