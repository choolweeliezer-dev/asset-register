import React from "react";
import SubscriptionsTable from "./SubscriptionsTable";
import AddSubscriptionDialog from "./AddSubForm";

export default function AddSubPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
        <SubscriptionsTable onOpenAddForm={() => setOpen(true)} />
        <AddSubscriptionDialog
          open={open}
          onClose={() => setOpen(false)}    
        />
    </>
  );
}