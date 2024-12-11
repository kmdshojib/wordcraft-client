import React, { useState } from 'react';
import { Card } from 'antd';
import { motion } from 'framer-motion';

const LessonCard = ({ lesson, index }: any) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
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
            >
                <div className="flex flex-col items-center justify-center h-full p-6">
                    <motion.div
                        animate={{ rotate: isHovered ? 360 : 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-5xl mb-4 text-rose-500"
                    >
                        {lesson.icon && React.createElement(lesson.icon)} {/* Render as React component */}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{lesson.title}</h3>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-0.5 w-full bg-rose-500"
                    />
                </div>
            </Card>
        </motion.div>
    );
};

export default LessonCard;
