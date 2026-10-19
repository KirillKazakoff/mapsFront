import React, { useEffect, useState } from 'react';
import {
    Card, Form, Input, Button, Alert,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import authStore from '../../stores/authStore';
import { api } from '../../api/api';
import { LoginT } from '../../../types/backend';

export const LoginForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Функция, которая сработает при успешной валидации полей формы
    const onFinish = async (values: LoginT) => {
        setLoading(true);
        setError(null);

        try {
            console.log('Отправка данных:', values);
            // Здесь ваш запрос к API, например:
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
};
