import { FC, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useAppContext } from '../hooks/useAppContext';
import { userLogin } from '../api/authService';
import { Link, useNavigate } from 'react-router';

const { Item } = Form;

const Login: FC = () => {
    const { setUser }: any = useAppContext();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const res = await userLogin(values);
            if (res.statusCode === 200) {
                setUser(res.data);
                message.success(res.message);
                navigate(res.data.role === 'admin' ? '/dashboard' : '/');
            } else {
                message.error(res.message || 'Login failed');
            }
        } catch (error: any) {
            message.error(error.response?.data?.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
                <p className="text-sm text-gray-600 mb-4 text-center">Login to access your account!</p>
                <Form
                    name="normal_login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input
                            prefix={<FaEnvelope className="text-rose-500 mr-2" />}
                            placeholder="Email"
                            className="rounded-md border-rose-300 focus:border-rose-500 focus:ring focus:ring-rose-200"
                        />
                    </Item>
                    <Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input.Password
                            prefix={<FaLock className="text-rose-500 mr-2" />}
                            placeholder="Password"
                            className="rounded-md border-rose-300 focus:border-rose-500 focus:ring focus:ring-rose-200"
                        />
                    </Item>
                    <Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="w-full bg-rose-500 hover:bg-rose-600 border-rose-500 hover:border-rose-600 text-white rounded-md"
                        >
                            Log in
                        </Button>
                    </Item>
                </Form>
                <p className="px-6 text-sm text-center dark:text-gray-600">Don't have an account yet?
                    <Link rel="noopener noreferrer" to="/register" className="hover:underline hover:text-rose-500">Sign Up!</Link>.
                </p>
            </div>
        </div>
    );
};

export default Login;
