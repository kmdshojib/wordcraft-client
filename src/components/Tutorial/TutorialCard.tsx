import { useState } from 'react'
import { Card, Modal } from 'antd'
import { motion } from 'framer-motion'
import { FaPlay } from 'react-icons/fa'
import { Tutorial } from '../../constants/Tutorial'

interface TutorialCardProps {
    tutorial: Tutorial
    index: number
}

const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial, index }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <Card
                    hoverable
                    className="w-full h-full bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 ease-in-out"
                    onClick={() => setIsModalVisible(true)}
                >
                    <div className="flex flex-col items-center justify-center h-full p-6">
                        <motion.div
                            animate={{ rotate: isHovered ? 360 : 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-5xl mb-4 text-rose-500"
                        >
                            {<tutorial.icon />}
                        </motion.div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{tutorial.title}</h3>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4"
                        >
                            <FaPlay className="text-rose-500 text-2xl" />
                        </motion.div>
                    </div>
                </Card>
            </motion.div>
            <Modal
                title={tutorial.title}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={800}
            >
                <div className="aspect-w-16 aspect-h-9">
                    <iframe
                        src={`https://www.youtube.com/embed/${tutorial.videoId}`}
                        title={tutorial.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                </div>
            </Modal>
        </>
    )
}
export default TutorialCard