import React, { ChangeEventHandler, useState } from 'react';

function inputUser<T> (initialData: T) {
    const [data, setData] = useState(initialData);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
    }

}

export default inputUser;
