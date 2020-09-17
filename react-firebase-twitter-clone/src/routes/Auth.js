import React, { useState } from 'react';
import { authService, firebaseInstance } from '../firebase';

function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);

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

    const onToggle = () => {
        setNewAccount(prev => !prev);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                //create account
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                //Log In
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const onSocial = async (e) => {
        const { target: { name } } = e;

        let provider;
        if (name === 'google') {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
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
                    value={newAccount ? 'Create Account' : 'Sign In'}
                />
            </form>
            <span onClick={onToggle}>{newAccount ? 'Sign In' : 'Create Account'}</span>
            <div>
                <button name='google' onClick={onSocial}>Continue with Google</button>
                <button name='github' onClick={onSocial}>Continue with GitHub</button>
            </div>
        </div>
    );
}

export default Auth;