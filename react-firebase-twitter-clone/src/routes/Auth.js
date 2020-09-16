import React, { useState } from 'react';

function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChange = (e) => {
        const { target: { name, value } } = e;

        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                return null;
        }
    };

    const onSubmit = (e) => {
        e.prevent.default();
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name='email'
                    type='text'
                    placeholder='Email'
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name='password'
                    type='password'
                    placeholder='password'
                    required
                    value={password}
                    onChange={onChange}
                />
                <input
                    type='submit'
                    value='Log In'
                />
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with GitHub</button>
            </div>
        </div>
    );
}

export default Auth;