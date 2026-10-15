import React from 'react';
import { Users, RefreshCw, Trash2 } from 'lucide-react';
import { Button, Badge } from '../common';
import { formatDate } from '../../utils';

export const AdminUsersTab = ({ users, currentUserId, onDeleteUser, onRefresh }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
      <h3 className="text-sm font-bold tracking-[0.18em] text-neutral-950 uppercase flex items-center gap-2 font-serif-luxury">
        <Users size={16} /> REGISTERED USERS MANAGEMENT ({users.length})
      </h3>
      <Button variant="link" size="sm" icon={RefreshCw} onClick={onRefresh}>
        Refresh
      </Button>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-neutral-200 text-neutral-400 uppercase font-bold tracking-wider">
            <th className="pb-3">NAME</th>
            <th className="pb-3">EMAIL</th>
            <th className="pb-3">ROLE</th>
            <th className="pb-3">JOINED</th>
            <th className="pb-3 text-right">ACTION</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 font-medium text-neutral-800">
          {users.map((u) => (
            <tr key={u._id}>
              <td className="py-3 font-bold">{u.firstName} {u.lastName}</td>
              <td className="py-3">{u.email}</td>
              <td className="py-3">
                <Badge variant={u.role === 'admin' ? 'admin' : 'subtle'}>
                  {u.role}
                </Badge>
              </td>
              <td className="py-3 text-neutral-500 text-[11px]">
                {formatDate(u.createdAt)}
              </td>
              <td className="py-3 text-right">
                {u._id !== currentUserId && (
                  <button
                    onClick={() => onDeleteUser(u._id, u.email)}
                    className="p-1.5 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                    title="Delete user"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
