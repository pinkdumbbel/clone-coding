import { useCallback, useState } from 'react';

type ReturnType<T> = [ T, 
                       (e: React.ChangeEvent<HTMLInputElement>) => void,
                     ]

function inputUser <T>(initialData: T): ReturnType<T> {
    const [data, setData] = useState(initialData);

    const handler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setData((e.target.value as unknown) as T );   
    },[]);

    return [data, handler];
}

export default inputUser;
