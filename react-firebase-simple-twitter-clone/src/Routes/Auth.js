import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";

function Auth({ authProps }) {
    const { onChange, onToggle, onSubmit, onSocial, email, password, newAccount } = authProps;

    return (
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <form onSubmit={onSubmit} className="container">
                <input
                    name='email'
                    type='text'
                    placeholder='Email'
                    required
                    value={email}
                    onChange={onChange}
                    className="authInput"
                />
                <input
                    name='password'
                    type='password'
                    placeholder='password'
                    required
                    value={password}
                    onChange={onChange}
                    className="authInput"
                />
                <input
                    type='submit'
                    value={newAccount ? 'Create Account' : 'Sign In'}
                    className="authInput authSubmit"
                />
            </form>
            <span onClick={onToggle} className="authSwitch">
                {newAccount ? 'Sign In' : 'Create Account'}
            </span>
            <div className="authBtns">
                <button name='google' onClick={onSocial} className="authBtn">
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button name='github' onClick={onSocial} className="authBtn">
                    Continue with GitHub <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    );
}

export default Auth;