import { FC } from 'react'
import LessonGrid from '../components/Lesson/LessonGrid'

const Home: FC = () => {
    return (
        <div>
            <div className="min-h-screen bg-gradient-to-b from-white to-rose-100 pt-10">
                <LessonGrid />
            </div>
        </div>
    )
}

export default Home