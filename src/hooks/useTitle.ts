import { useEffect } from 'react';

const useTitle = (title: string) => {
    useEffect(() => {
        const previousTitle = document.title;
        document.title = title;

        return () => {
            document.title = previousTitle;
        };
    }, [title]);
};

export default useTitle;