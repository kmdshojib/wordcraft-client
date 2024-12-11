import { useState } from 'react'
import { Button, Drawer } from 'antd'
import { MdMenu, MdClose } from 'react-icons/md'
import NavItem from './NavItem'
import { Link, useNavigate } from 'react-router'



export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const showDrawer = () => setIsOpen(true)
    const closeDrawer = () => setIsOpen(false)

    return (
        <nav className="bg-white shadow-lg fixed w-full z-[100]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link to="/">
                                <h1>Logo</h1>
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <NavItem href="/tutorial">Tutorial</NavItem>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <Button
                            onClick={() => navigate("/login")}
                            type="default"
                            className="text-black font-bold mr-3"
                        >
                            Login
                        </Button>
                        <Button
                            onClick={() => navigate("/register")}
                            className="bg-rose-500 hover:bg-rose-600 border-rose-500 hover:border-rose-600 text-white font-bold"
                        >
                            Sign Up
                        </Button>

                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <Button
                            type="text"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-rose-500 hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-rose-500 focus:ring-white"
                            onClick={showDrawer}
                            icon={<MdMenu className="h-6 w-6" />}
                        />
                    </div>
                </div>
            </div>

            <Drawer
                title="Menu"
                placement="right"
                onClose={closeDrawer}
                open={isOpen}
                width={300}
                closeIcon={<MdClose className="text-gray-400 hover:text-gray-500" />}
            >
                <div className="flex flex-col h-full">
                    <div className="flex-1 py-6 overflow-y-auto px-4">
                        <div className="space-y-2">
                            <NavItem href="#home" onClick={closeDrawer}>Home</NavItem>
                            <NavItem href="#about" onClick={closeDrawer}>About</NavItem>
                            <NavItem href="#services" onClick={closeDrawer}>Services</NavItem>
                            <NavItem href="#contact" onClick={closeDrawer}>Contact</NavItem>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 p-4">
                        <Button
                            type="primary"
                            className="w-full bg-rose-500 hover:bg-rose-600 border-rose-500 hover:border-rose-600 text-white font-bold mb-2"
                            onClick={() => {
                                navigate("/register")
                                closeDrawer()
                            }}
                        >
                            Sign Up
                        </Button>
                        <Button
                            type="default"
                            className="w-full text-black font-bold"
                            onClick={() => {
                                navigate("/login")
                                closeDrawer()
                            }}
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </Drawer>
        </nav>
    )
}

