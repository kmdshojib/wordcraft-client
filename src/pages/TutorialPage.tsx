import { FC } from 'react'
import TutorialGrid from '../components/Tutorial/TutorialGrid'
import useTitle from '../hooks/useTitle'

const TutorialPage: FC = () => {
    useTitle("Word Craft | Tutorial")
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-rose-100 pt-5">
            <TutorialGrid />
        </div>
    )
}

export default TutorialPage