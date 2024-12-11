
import { useState, useEffect } from 'react'
import { Button, Card, message } from 'antd'
import { motion } from 'framer-motion'
import Confetti from 'react-confetti'
import { FaVolumeUp, FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa'
import { useNavigate } from 'react-router';
import { useParams } from 'react-router'

// Mock vocabulary data (replace with actual data fetching in a real application)
const mockVocabulary = [
    { id: 1, word: 'こんにちは', pronunciation: 'Konnichiwa', meaning: 'Hello', whenToSay: 'Greeting during the day' },
    { id: 2, word: 'ありがとう', pronunciation: 'Arigatou', meaning: 'Thank you', whenToSay: 'Expressing gratitude' },
    { id: 3, word: 'さようなら', pronunciation: 'Sayounara', meaning: 'Goodbye', whenToSay: 'Parting ways' },
]

const LessonPage = () => {
    const {id} = useParams()
    console.log(id)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isCompleted, setIsCompleted] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (showConfetti) {
            const timer = setTimeout(() => {
                setShowConfetti(false)
                navigate('/lessons')
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [showConfetti, navigate])

    const currentVocab = mockVocabulary[currentIndex]

    const playPronunciation = () => {
        const utterance = new SpeechSynthesisUtterance(currentVocab.pronunciation)
        utterance.lang = 'ja-JP'
        speechSynthesis.speak(utterance)
    }

    const handleNext = () => {
        if (currentIndex < mockVocabulary.length - 1) {
            setCurrentIndex(currentIndex + 1)
        } else {
            setIsCompleted(true)
        }
    }

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }

    const handleComplete = () => {
        setShowConfetti(true)
        message.success('Lesson completed!')
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-rose-100 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Lesson {}</h1>
                <Card className="w-full max-w-2xl mx-auto">
                    <motion.div
                        key={currentVocab.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center"
                    >
                        <h2 className="text-4xl font-bold mb-4 text-rose-500">{currentVocab.word}</h2>
                        <p className="text-xl mb-2">{currentVocab.pronunciation}</p>
                        <Button
                            icon={<FaVolumeUp />}
                            onClick={playPronunciation}
                            className="mb-4"
                        >
                            Play Pronunciation
                        </Button>
                        <p className="text-lg mb-2"><strong>Meaning:</strong> {currentVocab.meaning}</p>
                        <p className="text-lg mb-4"><strong>When to say:</strong> {currentVocab.whenToSay}</p>
                    </motion.div>
                    <div className="flex justify-between mt-8">
                        <Button
                            icon={<FaArrowLeft />}
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                        >
                            Previous
                        </Button>
                        {isCompleted ? (
                            <Button
                                type="primary"
                                icon={<FaCheck />}
                                onClick={handleComplete}
                                className="bg-rose-500 hover:bg-rose-600 border-rose-500"
                            >
                                Complete Lesson
                            </Button>
                        ) : (
                            <Button
                                type="primary"
                                icon={<FaArrowRight />}
                                onClick={handleNext}
                                className="bg-rose-500 hover:bg-rose-600 border-rose-500"
                            >
                                Next
                            </Button>
                        )}
                    </div>
                </Card>
            </div>
            {showConfetti && <Confetti />}
        </div>
    )
}

export default LessonPage

