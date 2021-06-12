import { Dispatch, SetStateAction, useCallback, useState } from 'react';

type ReturnType<T, E> = [T,
    (e: React.ChangeEvent<E>) => void,
    Dispatch<SetStateAction<T>>
]

function inputUser<T, E>(initialData: T): ReturnType<T, E> {
    const [data, setData] = useState<typeof initialData>(initialData);

    const handler = useCallback((e: any) => {
        const value = (e.target.value as unknown) as T;
        setData(value);
    }, []);

    return [data, handler, setData];
}

export default inputUser;
