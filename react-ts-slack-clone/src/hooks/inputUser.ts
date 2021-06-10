import { Dispatch, SetStateAction, useCallback, useState } from 'react';

type ReturnType<T> = [ T, 
                       (e: React.ChangeEvent<HTMLInputElement>) => void,
                       Dispatch<SetStateAction<T>>
                     ]

function inputUser <T>(initialData: T): ReturnType<T> {
    const [data, setData] = useState<typeof initialData>(initialData);

    const handler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = (e.target.value as unknown) as T;
        setData(value);   
    },[]);

    return [data, handler, setData];
}

export default inputUser;
