import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import LessonCard from './LessonCard';
import { getLessons } from '../../api/lessonService';
import { Alert } from 'antd';
import * as Icons from 'react-icons/fa';

type Lesson = {
    _id: number;
    title: string;
    icon: string;
};

const LessonGrid = () => {
    const navigate = useNavigate();
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleLessonClick = (_id: number) => {
        navigate(`/lesson/${_id}`);
    };

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                setLoading(true);
                setError(null);
                const data: any = await getLessons(); // Fetch data from the backend

                // Map icon names to icon components dynamically
                const formattedLessons = data.map((lesson: any) => ({
                    ...lesson,
                    icon: (Icons as any)[lesson.icon] || null, // Safely index Icons, no function call
                }));
                setLessons(formattedLessons);
            } catch (error) {
                setError('Failed to load lessons. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    (<span className="text-rose-500">日本</span>)Japanese Vocabulary Lessons
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-12">
                <Alert message="Error" description={error} type="error" showIcon />
            </div>
        );
    }

    if (lessons.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    (<span className="text-rose-500">日本</span>)Japanese Vocabulary Lessons
                </h2>
                <div className="text-center text-gray-600">
                    No lessons available at the moment. Please check back later.
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                (<span className="text-rose-500">日本</span>)Japanese Vocabulary Lessons
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {lessons.map((lesson, index) => (
                    <div key={lesson._id} onClick={() => handleLessonClick(lesson._id)}>
                        <LessonCard key={lesson._id} lesson={lesson} index={index} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LessonGrid;
