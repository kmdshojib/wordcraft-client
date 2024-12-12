'use client'

import React, { useEffect, useState } from 'react';
import { Table, Button, message, Popconfirm, Spin, Avatar } from 'antd';
import { FaUserShield, FaUser } from 'react-icons/fa';
import { useAppContext } from '../../hooks/useAppContext';
import { getAllUsers, updateUserRole } from '../../api/authService';

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    photoUrl: string;
}

const UserManagement: React.FC = () => {
    const { user }: any = useAppContext();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getAllUsers(user._id);
                console.log('Users data:', response);
                setUsers(response);
            } catch (err) {
                setError('Failed to fetch users. Please try again later.');
                console.error('Error fetching users:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [user._id]);

    const handleRoleChange = async (userId: string, newRole: string) => {
        setLoading(true);
        const userEmail = users.find((user: any) => user._id === userId);
        const { email }: any = userEmail
        try {
            const userRole = {
                email,
                role: newRole,
            };
            const res = await updateUserRole(userRole);
            if (res.statusCode === 200) {
                message.success(res.message);

                setUsers((prevUsers) =>
                    prevUsers.map((u) =>
                        u._id === userId ? { ...u, role: newRole } : u
                    )
                );
            } else {
                message.error('Failed to update user role');
            }
        } catch (err) {
            message.error('Failed to update user role. Please try again later.');
            console.error('Error updating user role:', err);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Photo',
            dataIndex: 'photoUrl',
            key: 'photoUrl',
            render: (photoUrl: string) => <Avatar src={photoUrl} />,
        },
        {
            title: 'Username',
            dataIndex: 'name',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role: string) => role.charAt(0).toUpperCase() + role.slice(1),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: User) => (
                <span>
                    {record.role.toLowerCase() !== 'admin' ? (
                        <Popconfirm
                            title="Are you sure you want to promote this user to Admin?"
                            onConfirm={() => handleRoleChange(record._id, 'admin')}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button icon={<FaUserShield />} className="mr-2">
                                Promote to Admin
                            </Button>
                        </Popconfirm>
                    ) : (
                        <Popconfirm
                            title="Are you sure you want to demote this user to Normal User?"
                            onConfirm={() => handleRoleChange(record._id, 'user')}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button icon={<FaUser />} danger>
                                Demote to Normal User
                            </Button>
                        </Popconfirm>
                    )}
                </span>
            ),
        },
    ];

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {loading ? (
                <Spin size="large" />
            ) : (
                <Table 
                    columns={columns} 
                    dataSource={users} 
                    rowKey="_id"
                    scroll={{ x: true }}
                    // responsive={['md']}
                />
            )}
        </div>
    );
};

export default UserManagement;

