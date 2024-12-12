import React from 'react';
import { Button } from 'antd';

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen from-white to-rose-100 text-black">
            <h1 className="text-9xl font-bold">404</h1>
            <p className="text-2xl mt-4">Oops! The page you're looking for isn't here.</p>
            <p className="text-lg mt-2">It might have been removed, or the URL might be incorrect.</p>
            <Button
                className="mt-6 bg-rose-500 hover:bg-rose-600 border-rose-500 hover:border-rose-600 text-white"
                onClick={() => window.location.href = '/'}
            >
                Go to Login!
            </Button>
        </div>
    );
};

export default NotFoundPage;