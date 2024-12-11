import { FC } from 'react'
import TutorialGrid from '../components/Tutorial/TutorialGrid'

const TutorialPage: FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-rose-100 pt-5">
            <TutorialGrid />
        </div>
    )
}

export default TutorialPage