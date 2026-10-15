import React from 'react';
import { Input, Button } from '../common';

export const AccountDetailsTab = ({ user }) => (
  <div className="space-y-6 max-w-xl">
    <h3 className="text-sm font-bold tracking-[0.18em] text-neutral-950 uppercase border-b border-neutral-200 pb-3 font-serif-luxury">
      ACCOUNT DETAILS
    </h3>
    <form className="space-y-4 text-xs">
      <div className="grid grid-cols-2 gap-4">
        <Input label="First Name" defaultValue={user.firstName} />
        <Input label="Last Name" defaultValue={user.lastName} />
      </div>
      <Input label="Email Address" type="email" defaultValue={user.email} uppercase={false} />
      <Button type="button" variant="primary">
        SAVE CHANGES
      </Button>
    </form>
  </div>
);
