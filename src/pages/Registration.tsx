import { useState, FC } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { FaUser, FaEnvelope, FaLock, FaUpload } from 'react-icons/fa';
import { userRegistration } from '../api/authService'; // Make sure this function is implemented
import { Link, useNavigate } from 'react-router';
import useTitle from '../hooks/useTitle';

const { Item } = Form;

const Registration: FC = () => {
    useTitle("Word Craft | Registration");
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        setLoading(true);

        if (fileList.length === 0) {
            message.error('Please upload a profile photo.');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("file", fileList[0].originFileObj); // Cloudinary expects 'file'
        formData.append("upload_preset", "i05gycig"); // Replace with your Cloudinary preset

        try {
            // Upload image to Cloudinary
            const cloudinaryRes = await fetch("https://api.cloudinary.com/v1_1/dy85l0m09/image/upload", {
                method: "POST",
                body: formData,
            });

            if (!cloudinaryRes.ok) {
                throw new Error('Image upload failed');
            }

            const cloudinaryData = await cloudinaryRes.json();

            if (cloudinaryData.secure_url) {
                const photoUrl = cloudinaryData.secure_url; // Cloudinary image URL

                // Prepare backend payload
                const backendPayload = {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    photoUrl,
                };

                // Send data to backend
                const res = await userRegistration(backendPayload);

                if (res.statusCode === 201) {
                    message.success(res.message);
                    navigate('/'); // Redirect to login page or home page
                    form.resetFields();
                    setFileList([]); // Clear the file list
                } else {
                    message.error(res.message || 'Registration failed');
                }
            } else {
                throw new Error('URL not found in Cloudinary response');
            }
        } catch (error: any) {
            message.error(error.message || 'An error occurred during registration');
        } finally {
            setLoading(false);
        }
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) return e;
        return e?.fileList;
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-2">Register</h2>
                <p className="text-sm text-gray-600 mb-4 text-center">Register to create your account!</p>
                <Form
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                    layout="vertical"
                >
                    <Item
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input
                            prefix={<FaUser className="text-rose-500 mr-2" />}
                            placeholder="Full Name"
                            className="rounded-md border-rose-300 focus:border-rose-500 focus:ring focus:ring-rose-200"
                        />
                    </Item>
                    <Item
                        name="email"
                        rules={[
                            { type: 'email', message: 'The input is not valid E-mail!' },
                            { required: true, message: 'Please input your E-mail!' },
                        ]}
                    >
                        <Input
                            prefix={<FaEnvelope className="text-rose-500 mr-2" />}
                            placeholder="Email"
                            className="rounded-md border-rose-300 focus:border-rose-500 focus:ring focus:ring-rose-200"
                        />
                    </Item>
                    <Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            prefix={<FaLock className="text-rose-500 mr-2" />}
                            placeholder="Password"
                            className="rounded-md border-rose-300 focus:border-rose-500 focus:ring focus:ring-rose-200"
                        />
                    </Item>
                    <Item
                        name="photo"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: 'Please upload a profile photo!' }]}
                    >
                        <Upload
                            name="photo"
                            listType="picture"
                            beforeUpload={() => false}
                            onChange={({ fileList }) => setFileList(fileList)}
                            maxCount={1}
                        >
                            <Button
                                icon={<FaUpload className="mr-2" />}
                                type='default'
                                className=" text-black rounded-md"
                            >
                                Click to upload profile photo
                            </Button>
                        </Upload>
                    </Item>
                    <Item>
                        <Button
                            htmlType="submit"
                            loading={loading}
                            className="w-full bg-rose-500 hover:bg-rose-600 border-rose-500 hover:border-rose-600 text-white rounded-md"
                        >
                            Register
                        </Button>
                    </Item>
                    <p className="px-6 text-sm text-center dark:text-gray-600">Have an account yet?
                        <Link rel="noopener noreferrer" to="/" className="hover:underline hover:text-rose-500">Login</Link>.
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default Registration;
