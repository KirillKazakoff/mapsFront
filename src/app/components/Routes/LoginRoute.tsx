import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {
    Card, Form, Alert, Input, Button,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { LoginT } from '../../../types/backend';
import { api } from '../../api/api';
import authStore from '../../stores/authStore';

export const LoginRoute = observer(() => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form] = useForm<LoginT>();

    // remove autocomplete
    useEffect(() => {
        form.setFieldsValue({
            password: '',
            username: '',
        });
    }, []);

    // Функция, которая сработает при успешной валидации формы
    const onFinish = async (values: LoginT) => {
        setLoading(true);
        setError(null);

        try {
            console.log('Отправка данных:', values);
            const apiRes = await api.login(values);
            const isResOk = apiRes === 'ok';

            authStore.login(isResOk);
        } catch (err: any) {
            setError(err?.message || 'Неверный логин или пароль');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f0f2f5',
            }}
        >
            <Card
                title='Авторизация'
                style={{
                    width: 360,
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
            >
                <Form
                    form={form}
                    name='login_form'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout='vertical'
                >
                    {error && (
                        <Alert
                            message={error}
                            type='error'
                            showIcon
                            style={{ marginBottom: 16 }}
                        />
                    )}

                    <Form.Item
                        name='username'
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите имя пользователя!',
                            },
                        ]}
                    >
                        <Input
                            autoComplete='new-user'
                            prefix={
                                <UserOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />
                            }
                            placeholder='Имя пользователя / Email'
                            size='large'
                        />
                    </Form.Item>

                    <Form.Item
                        name='password'
                        rules={[
                            { required: true, message: 'Пожалуйста, введите пароль!' },
                        ]}
                    >
                        <Input.Password
                            autoComplete='new-password'
                            prefix={
                                <LockOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />
                            }
                            placeholder='Пароль'
                            size='large'
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0 }}>
                        <Button
                            type='primary'
                            htmlType='submit'
                            loading={loading}
                            block
                            size='large'
                        >
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
});
