import { FC } from 'react'
import { Link } from 'react-router';

const NavItem: FC<{ href: string; children: React.ReactNode; onClick?: () => void }> = ({ href, children, onClick }) => (
    <Link
        to={href}
        onClick={onClick}
        className="text-gray-700 hover:text-rose-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out hover:bg-rose-100 block"
    >
        {children}
    </Link>
)

export default NavItem