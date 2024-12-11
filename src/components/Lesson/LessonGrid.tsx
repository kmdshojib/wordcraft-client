import { lessons } from '../../constants/Lesson'
import LessonCard from './LessonCard'


const LessonGrid = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                (<span className='text-rose-500'>日本</span>)Japanese Vocabulary Lessons
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {lessons.map((lesson, index) => (
                    <LessonCard key={lesson.id} lesson={lesson} index={index} />
                ))}
            </div>
        </div>
    )
}

export default LessonGrid