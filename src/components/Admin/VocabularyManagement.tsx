import React, { useState } from 'react'
import { Table, Button, Modal, Form, Input, Select, message, Popconfirm } from 'antd'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'

interface Vocabulary {
  id: string
  word: string
  pronunciation: string
  meaning: string
  whenToSay: string
  lessonId: string
}

interface Lesson {
  id: string
  title: string
}

const initialVocabularies: Vocabulary[] = [
  { id: '1', word: 'こんにちは', pronunciation: 'Konnichiwa', meaning: 'Hello', whenToSay: 'Greeting during the day', lessonId: '1' },
  { id: '2', word: 'ありがとう', pronunciation: 'Arigatou', meaning: 'Thank you', whenToSay: 'Expressing gratitude', lessonId: '1' },
  { id: '3', word: 'いち', pronunciation: 'Ichi', meaning: 'One', whenToSay: 'Counting or referring to quantity', lessonId: '2' },
  { id: '4', word: 'あか', pronunciation: 'Aka', meaning: 'Red', whenToSay: 'Describing color', lessonId: '3' },
]

const lessons: Lesson[] = [
  { id: '1', title: 'Basic Greetings' },
  { id: '2', title: 'Numbers' },
  { id: '3', title: 'Colors' },
]

const VocabularyManagement: React.FC = () => {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>(initialVocabularies)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [editingVocabulary, setEditingVocabulary] = useState<Vocabulary | null>(null)
  const [filterLesson, setFilterLesson] = useState<string | null>(null)

  const showModal = (vocabulary?: Vocabulary) => {
    if (vocabulary) {
      setEditingVocabulary(vocabulary)
      form.setFieldsValue(vocabulary)
    } else {
      setEditingVocabulary(null)
      form.resetFields()
    }
    setIsModalVisible(true)
  }

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingVocabulary) {
        setVocabularies(prevVocabularies =>
          prevVocabularies.map(vocab =>
            vocab.id === editingVocabulary.id ? { ...vocab, ...values } : vocab
          )
        )
        message.success('Vocabulary updated successfully')
      } else {
        const newVocabulary: Vocabulary = {
          id: Date.now().toString(),
          ...values,
        }
        setVocabularies(prevVocabularies => [...prevVocabularies, newVocabulary])
        message.success('Vocabulary created successfully')
      }
      setIsModalVisible(false)
    })
  }

  const handleDelete = (id: string) => {
    setVocabularies(prevVocabularies => prevVocabularies.filter(vocab => vocab.id !== id))
    message.success('Vocabulary deleted successfully')
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
      title: 'Lesson',
      dataIndex: 'lessonId',
      key: 'lessonId',
      render: (lessonId: string) => {
        const lesson = lessons.find(l => l.id === lessonId)
        return lesson ? lesson.title : 'Unknown'
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Vocabulary) => (
        <span>
          <Button icon={<FaEdit />} onClick={() => showModal(record)} className="mr-2" />
          <Popconfirm
            title="Are you sure you want to delete this vocabulary?"
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
        Create Vocabulary
      </Button>
      <Select
        style={{ width: 200, marginBottom: 16, marginLeft: 16 }}
        placeholder="Filter by Lesson"
        allowClear
        onChange={(value) => setFilterLesson(value)}
      >
        {lessons.map(lesson => (
          <Select.Option key={lesson.id} value={lesson.id}>{lesson.title}</Select.Option>
        ))}
      </Select>
      <Table
        columns={columns}
        dataSource={vocabularies.filter(v => !filterLesson || v.lessonId === filterLesson)}
        rowKey="id"
      />
      <Modal
        title={editingVocabulary ? 'Edit Vocabulary' : 'Create Vocabulary'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
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
          <Form.Item
            name="lessonId"
            label="Lesson"
            rules={[{ required: true, message: 'Please select a lesson!' }]}
          >
            <Select>
              {lessons.map(lesson => (
                <Select.Option key={lesson.id} value={lesson.id}>{lesson.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default VocabularyManagement

