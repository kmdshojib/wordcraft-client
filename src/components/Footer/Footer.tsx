import { FC } from 'react';
import { FaHeart } from 'react-icons/fa'

const Footer: FC = () => {
    return (
        <footer className="bg-gray-100 py-6 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm">
                        © {new Date().getFullYear()} Japanese Learning App. All rights reserved.
                    </p>
                    <div className="flex items-center mt-4 md:mt-0">
                        <span className=" text-sm mr-2">Made with</span>
                        <FaHeart className="text-rose-500" />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

