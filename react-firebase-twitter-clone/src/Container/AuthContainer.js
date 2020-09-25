import React, { useState } from 'react';
import Auth from '../Routes/Auth';
import propsCreateFn from '../Module/AuthFunction';

function AuthContainer() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);

    const authProps = propsCreateFn(setNewAccount, setEmail, setPassword, email, password, newAccount);

    return (
        <Auth authProps={authProps} />
    );
}

export default AuthContainer;