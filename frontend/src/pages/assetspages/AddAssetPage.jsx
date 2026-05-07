import React from "react";
import ItAssets from "./ItAssets";
import {AddAssetDialog} from "./AddAssetForm";

export default function AddAssetPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
        <ItAssets onOpenAddForm={() => setOpen(true)} />
        <AddAssetDialog
          open={open}
          onClose={() => setOpen(false)}    
        />
    </>
  );
}