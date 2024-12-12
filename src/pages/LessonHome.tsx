import { FC } from 'react'
import LessonGrid from '../components/Lesson/LessonGrid'
import useTitle from '../hooks/useTitle'

const LessonHome: FC = () => {
    useTitle("Word Craft | Lesson")
    return (
        <div>
            <div className="min-h-screen bg-gradient-to-b from-white to-rose-100 pt-5">
                <LessonGrid />
            </div>
        </div>
    )
}

export default LessonHome