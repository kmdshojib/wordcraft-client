import { FC } from 'react'
import LessonGrid from '../components/Lesson/LessonGrid'

const LessonHome: FC = () => {
    return (
        <div>
            <div className="min-h-screen bg-gradient-to-b from-white to-rose-100 pt-5">
                <LessonGrid />
            </div>
        </div>
    )
}

export default LessonHome