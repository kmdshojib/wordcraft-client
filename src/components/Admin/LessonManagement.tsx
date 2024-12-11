'use client'

import React, { useState } from 'react'
import { Table, Button, Modal, Form, Input, message, Popconfirm } from 'antd'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'

interface Lesson {
    id: string
    title: string
    icon: string
    vocabularyCount: number
}

const initialLessons: Lesson[] = [
    { id: '1', title: 'Basic Greetings', icon: '👋', vocabularyCount: 10 },
    { id: '2', title: 'Numbers', icon: '🔢', vocabularyCount: 20 },
    { id: '3', title: 'Colors', icon: '🎨', vocabularyCount: 15 },
]

const LessonManagement: React.FC = () => {
    const [lessons, setLessons] = useState<Lesson[]>(initialLessons)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [form] = Form.useForm()
    const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)

    const showModal = (lesson?: Lesson) => {
        if (lesson) {
            setEditingLesson(lesson)
            form.setFieldsValue(lesson)
        } else {
            setEditingLesson(null)
            form.resetFields()
        }
        setIsModalVisible(true)
    }

    const handleOk = () => {
        form.validateFields().then((values) => {
            if (editingLesson) {
                setLessons(prevLessons =>
                    prevLessons.map(lesson =>
                        lesson.id === editingLesson.id ? { ...lesson, ...values } : lesson
                    )
                )
                message.success('Lesson updated successfully')
            } else {
                const newLesson: Lesson = {
                    id: Date.now().toString(),
                    ...values,
                    vocabularyCount: 0
                }
                setLessons(prevLessons => [...prevLessons, newLesson])
                message.success('Lesson created successfully')
            }
            setIsModalVisible(false)
        })
    }

    const handleDelete = (id: string) => {
        setLessons(prevLessons => prevLessons.filter(lesson => lesson.id !== id))
        message.success('Lesson deleted successfully')
    }

    const columns = [
        {
            title: 'Lesson Name',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Icon',
            dataIndex: 'icon',
            key: 'icon',
        },
        {
            title: 'Vocabulary Count',
            dataIndex: 'vocabularyCount',
            key: 'vocabularyCount',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Lesson) => (
                <span>
                    <Button icon={<FaEdit />} onClick={() => showModal(record)} className="mr-2" />
                    <Popconfirm
                        title="Are you sure you want to delete this lesson?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<FaTrash />} danger />
                    </Popconfirm>
                </span>
            ),
        },
    ]

    return (
        <div className="p-6">
            <Button
                type="primary"
                icon={<FaPlus />}
                onClick={() => showModal()}
                className="mb-4"
            >
                Create Lesson
            </Button>
            <Table columns={columns} dataSource={lessons} rowKey="id" />
            <Modal
                title={editingLesson ? 'Edit Lesson' : 'Create Lesson'}
                open={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="title"
                        label="Lesson Name"
                        rules={[{ required: true, message: 'Please input the lesson name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="icon"
                        label="Icon"
                        rules={[{ required: true, message: 'Please input the icon!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default LessonManagement

