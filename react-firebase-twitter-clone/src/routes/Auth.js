import React from 'react';

function Auth({ authProps }) {
    const { onChange, onToggle, onSubmit, onSocial, email, password, newAccount } = authProps;

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