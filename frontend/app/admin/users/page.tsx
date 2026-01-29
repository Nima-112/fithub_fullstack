'use client';

import { useState, useEffect } from 'react';
import { adminApi } from '../../lib/api';
import { Button } from '../../components/ui/Button';
import { Trash2, Shield, MoreVertical } from 'lucide-react';

export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await adminApi.getUsers();
            if (response.success) {
                setUsers(response.data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePromoteUser = async (user: any) => {
        const newRole = user.role === 'admin' ? 'user' : 'admin';
        const action = newRole === 'admin' ? 'promote' : 'demote';

        if (!window.confirm(`Are you sure you want to ${action} ${user.profile?.name} to ${newRole}?`)) return;

        try {
            await adminApi.updateUserRole(user._id, newRole);
            setUsers(users.map(u => u._id === user._id ? { ...u, role: newRole } : u));
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update user role');
        }
    };

    const handleDeleteUser = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            await adminApi.deleteUser(id);
            // Optimistic update
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user');
        }
    };

    if (loading) {
        return <div className="text-white">Loading users...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-display font-bold text-gray-900">Users Management</h1>
                <Button variant="primary">Add User</Button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Join Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-primary-neon font-bold">
                                                {user.profile?.name?.[0]?.toUpperCase() || 'U'}
                                            </div>
                                            <div>
                                                <div className="text-gray-900 font-medium">{user.profile?.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'admin'
                                            ? 'bg-purple-100 text-purple-700'
                                            : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {user.role === 'admin' && <Shield className="w-3 h-3" />}
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {/* <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button> */}
                                            {user.role !== 'admin' && (
                                                <Button
                                                    variant="secondary"
                                                    className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600 border-none"
                                                    onClick={() => handleDeleteUser(user._id)}
                                                    title="Delete User"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                            <Button
                                                variant="secondary"
                                                className={`h-8 w-8 p-0 border-none ${user.role === 'admin' ? 'text-purple-500 hover:bg-purple-50' : 'text-blue-500 hover:bg-blue-50'}`}
                                                onClick={() => handlePromoteUser(user)}
                                                title={user.role === 'admin' ? "Demote to User" : "Promote to Admin"}
                                            >
                                                <Shield className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
