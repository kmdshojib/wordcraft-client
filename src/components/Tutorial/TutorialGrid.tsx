import { tutorials } from "../../constants/Tutorial"
import TutorialCard from "./TutorialCard"

const TutorialGrid: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
      (<span className='text-rose-500'>日本</span>)Japanese Language Tutorials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tutorials.map((tutorial, index) => (
          <TutorialCard key={tutorial.id} tutorial={tutorial} index={index} />
        ))}
      </div>
    </div>
  )
}

export default TutorialGrid