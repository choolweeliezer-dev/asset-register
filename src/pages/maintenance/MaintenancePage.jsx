import React from "react";
import MaintenanceTable from "./MaintenanceTable";
import MaintenanceFormDialog from "../maintenance/maintenanceForm";

export default function MaintenancePage() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <MaintenanceTable onOpenForm={() => setOpen(true)} />

      <MaintenanceFormDialog
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}