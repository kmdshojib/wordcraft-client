'use client'

import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, Select, message, Popconfirm } from 'antd'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { getVocab, getLessons, createVocabulary, updateVocabulary, deleteVocabulary } from '../../api/lessonService'
import { useAppContext } from '../../hooks/useAppContext'

interface Vocabulary {
  _id: string
  word: string
  pronunciation: string
  meaning: string
  whenToSay: string
  lessonId: string
}

interface Lesson {
  _id: string
  title: string
}

const VocabularyManagement: React.FC = () => {
  const { user }: any = useAppContext()
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([])
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [editingVocabulary, setEditingVocabulary] = useState<Vocabulary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLessons()
  }, [])

  useEffect(() => {
    if (selectedLesson) {
      fetchVocabularies(selectedLesson)
    }
  }, [selectedLesson])

  const fetchLessons = async () => {
    try {
      const data = await getLessons()
      setLessons(data)
      if (data.length > 0) {
        setSelectedLesson(data[0]._id)
      }
    } catch (error) {
      message.error('Failed to fetch lessons')
    }
  }

  const fetchVocabularies = async (lessonId: string) => {
    try {
      setLoading(true)
      setError(null)
      const data = await getVocab(lessonId)
      setVocabularies(data.vocabulary)
    } catch (error) {
      setError('Failed to fetch vocabularies')
    } finally {
      setLoading(false)
    }
  }

  const showModal = (vocabulary?: Vocabulary) => {
    if (vocabulary) {
      setEditingVocabulary(vocabulary)
      form.setFieldsValue(vocabulary)
    } else {
      setEditingVocabulary(null)
      form.resetFields()
      form.setFieldsValue({ lessonId: selectedLesson })
    }
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      console.log(values)
      if (editingVocabulary) {
        await updateVocabulary(editingVocabulary._id, values)
        message.success('Vocabulary updated successfully')
      } else {
        const updatedVaues = { ...values, categoryId: selectedLesson, adminEmail: user.email }
        await createVocabulary(updatedVaues)
        message.success('Vocabulary created successfully')
      }
      setIsModalVisible(false)
      fetchVocabularies(selectedLesson!)
    } catch (error) {
      message.error('Failed to save vocabulary')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteVocabulary(id)
      message.success('Vocabulary deleted successfully')
      fetchVocabularies(selectedLesson!)
    } catch (error) {
      message.error('Failed to delete vocabulary')
    }
  }

  const columns = [
    {
      title: 'Word',
      dataIndex: 'word',
      key: 'word',
    },
    {
      title: 'Pronunciation',
      dataIndex: 'pronunciation',
      key: 'pronunciation',
    },
    {
      title: 'Meaning',
      dataIndex: 'meaning',
      key: 'meaning',
    },
    {
      title: 'When to Say',
      dataIndex: 'whenToSay',
      key: 'whenToSay',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Vocabulary) => (
        <span>
          <Button icon={<FaEdit />} onClick={() => showModal(record)} className="mr-2" />
          <Popconfirm
            title="Are you sure you want to delete this vocabulary?"
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
      <Select
        style={{ width: 200, marginBottom: 16 }}
        placeholder="Select a lesson"
        value={selectedLesson}
        onChange={setSelectedLesson}
      >
        {lessons.map(lesson => (
          <Select.Option key={lesson._id} value={lesson._id}>{lesson.title}</Select.Option>
        ))}
      </Select>
      <Button
        type="primary"
        icon={<FaPlus />}
        onClick={() => showModal()}
        className="mb-4 ml-4"
        disabled={!selectedLesson}
      >
        Add Vocabulary
      </Button>
      <Table 
        columns={columns} 
        dataSource={vocabularies} 
        rowKey="_id"
        scroll={{ x: true }}
        // responsive={['md']}
      />
      <Modal
        title={editingVocabulary ? 'Edit Vocabulary' : 'Create Vocabulary'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="lessonId" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="word"
            label="Word"
            rules={[{ required: true, message: 'Please input the word!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="pronunciation"
            label="Pronunciation"
            rules={[{ required: true, message: 'Please input the pronunciation!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="meaning"
            label="Meaning"
            rules={[{ required: true, message: 'Please input the meaning!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="whenToSay"
            label="When to Say"
            rules={[{ required: true, message: 'Please input when to say!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default VocabularyManagement

