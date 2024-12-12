'use client'

import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Input, message, Popconfirm, Select } from 'antd'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { createLessonCategory, deleteLessonCategory, getLessons, updateLessonCategory } from '../../api/lessonService'
import * as Icons from 'react-icons/fa'
import { useAppContext } from '../../hooks/useAppContext'

type Lesson = {
    _id: number;
    title: string;
    icon: string;
}

const { Option } = Select

const LessonManagement: React.FC = () => {
    const { user }: any = useAppContext()

    const [lessons, setLessons] = useState<Lesson[]>([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [form] = Form.useForm()
    const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchLessons()
    }, [])

    const fetchLessons = async () => {
        try {
            setLoading(true)
            setError(null)
            const data: Lesson[] = await getLessons()
            const formattedLessons = data.map((lesson: Lesson) => ({
                ...lesson,
                iconComponent: (Icons as any)[lesson.icon] || null,
            }))
            setLessons(formattedLessons)
        } catch (error) {
            setError('Failed to load lessons. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

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

    const handleOk = async () => {
        try {
            const values = await form.validateFields()

            if (editingLesson) {
                await updateLessonCategory(editingLesson._id, values)
                message.success('Lesson updated successfully')
            } else {
                const newLessonData = { ...values, createdBy: user.email }
                await createLessonCategory(newLessonData)
                message.success('Lesson created successfully')
            }
            setIsModalVisible(false)
            fetchLessons()
        } catch (error) {
            message.error('Failed to save lesson')
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteLessonCategory(id)
            message.success('Lesson deleted successfully')
            fetchLessons()
        } catch (error) {
            message.error('Failed to delete lesson')
        }
    }

    const columns = [
        {
            title: 'Lesson Name',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Created by',
            dataIndex: 'createdBy',
            key: 'createdBy',
        },
        {
            title: 'Icon',
            dataIndex: 'icon',
            key: 'icon',
            render: (icon: string, record: any) => {
                const IconComponent = record.iconComponent
                return IconComponent ? <IconComponent /> : icon
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Lesson) => (
                <span>
                    <Button icon={<FaEdit />} onClick={() => showModal(record)} className="mr-2" />
                    <Popconfirm
                        title="Are you sure you want to delete this lesson?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<FaTrash />} danger />
                    </Popconfirm>
                </span>
            ),
        },
    ]

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

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
            <Table 
                columns={columns} 
                dataSource={lessons} 
                rowKey="_id"
                scroll={{ x: true }}
                // responsive={['md']}
            />
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
                        rules={[{ required: true, message: 'Please select an icon!' }]}
                    >
                        <Select>
                            {Object.keys(Icons).map((iconName) => (
                                <Option key={iconName} value={iconName}>
                                    {React.createElement((Icons as any)[iconName])} {iconName}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default LessonManagement

