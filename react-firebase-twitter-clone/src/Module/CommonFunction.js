export const onChange = (e, fn) => {
    const { target: { value } } = e;

    fn(value);
};

export const onFileChange = (e, fn) => {
    const { target: { files } } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishedEvent => {
        const { currentTarget: { result } } = finishedEvent;
        fn(result);
    });
};