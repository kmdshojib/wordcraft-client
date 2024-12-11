import {  FaLanguage, FaBook, FaPencilAlt, FaHeadphones, FaComments } from 'react-icons/fa'
import { IconType } from 'react-icons'
export interface Tutorial {
    id: number
    title: string
    videoId: string
    icon: IconType
}

export const tutorials: Tutorial[] = [
    { id: 1, title: 'Basic Japanese Pronunciation', videoId: 'pSvH9vH60Ig', icon: FaLanguage },
    { id: 2, title: 'Essential Japanese Phrases', videoId: '4DxXdZMwZvA', icon: FaBook },
    { id: 3, title: 'Writing Hiragana', videoId: 'wD3FJgij79c', icon: FaPencilAlt },
    { id: 4, title: 'Japanese Listening Practice', videoId: 'o1jLIwSsQ0Q', icon: FaHeadphones },
    { id: 5, title: 'Basic Japanese Conversation', videoId: 'MxqdVFoOGS8', icon: FaComments },
    { id: 6, title: 'Japanese Vocabulary Builder', videoId: 'yExI-Q_oOkc', icon: FaBook },
]