import React, { useEffect, useRef } from 'react'
import { message, Tabs } from 'antd'
import { FaBook, FaLanguage, FaUsers } from 'react-icons/fa'
import VocabularyManagement from '../components/Admin/VocabularyManagement'
import LessonManagement from '../components/Admin/LessonManagement'
import UserManagement from '../components/Admin/UserManagement'
import { useAppContext } from '../hooks/useAppContext'
import { useNavigate } from 'react-router'

const AdminPage: React.FC = () => {
    const { user }: any = useAppContext();
    const navigate = useNavigate();
    const hasRedirected = useRef(false);

    useEffect(() => {
        if (user.role !== "admin" && !hasRedirected.current) {
            hasRedirected.current = true;
            message.error("Only admin can access this page.");
            navigate("/");
        }
    }, [user, navigate]);

    if (user.role !== "admin") {
        return null;
    }

    const items = [
        {
            key: '1',
            label: (
                <span>
                    <FaBook /> Lesson Management
                </span>
            ),
            children: <LessonManagement />,
        },
        {
            key: '2',
            label: (
                <span>
                    <FaLanguage /> Vocabulary Management
                </span>
            ),
            children: <VocabularyManagement />,
        },
        {
            key: '3',
            label: (
                <span>
                    <FaUsers /> User Management
                </span>
            ),
            children: <UserManagement />,
        },
    ]

    return (
        <div className="container mx-auto p-4 pt-20">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <Tabs 
                defaultActiveKey="1" 
                items={items}
                tabPosition={window.innerWidth < 768 ? 'top' : 'left'}
            />
        </div>
    )
}

export default AdminPage

