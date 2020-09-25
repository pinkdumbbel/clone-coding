import { authService, firebaseInstance } from '../firebase';

const onToggle = (setNewAccount) => {
    setNewAccount(prev => !prev);
};

const onSubmit = async (e, newAccount, email, password) => {
    e.preventDefault();
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

const propsCreateFn = (setNewAccount, setEmail, setPassword, email, password, newAccount) => ({
    onChange: (e) => {
        const { target: { name, value } } = e;
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    },
    onToggle: () => onToggle(setNewAccount),
    onSubmit: (e) => onSubmit(e, newAccount, email, password),
    onSocial: (e) => onSocial(e),
    email,
    password,
    newAccount
});

export default propsCreateFn;