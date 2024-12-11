import React from 'react'
import { Tabs } from 'antd'
import { FaBook, FaLanguage } from 'react-icons/fa'
import VocabularyManagement from '../components/Admin/VocabularyManagement'
import LessonManagement from '../components/Admin/LessonManagement'

const AdminPage: React.FC = () => {
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
    ]

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    )
}

export default AdminPage

