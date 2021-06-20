import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import {DragOver} from '@components/DragAndDrop/Styles';

interface FileTypes {
    id: number; // 파일들의 고유값 id
    file: File;
}

function DragAndDrop() {
    const [dragging, setDragging] = useState(false);
    const [files, setFiles] = useState<FileTypes[]>([]);
    const dragRef = useRef<HTMLDivElement>(null);
    
    console.log(dragRef);
    
    const handleDragIn = useCallback((e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();

        console.log('dragin');
        }, []);
    
    const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    console.log('dragin');
    setDragging(false);
    }, []);

    const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    console.log('dragin');
    if (e.dataTransfer!.files) {
        setDragging(true);
    }
    }, []);

    const handleDrop = useCallback(
    (e: DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();
        console.log('dragin');
        //onChangeFiles(e);
        setDragging(false);
    },
    []
    );
    
    const initDragEvents = useCallback((): void => {
    // 앞서 말했던 4개의 이벤트에 Listener를 등록합니다. (마운트 될때)

    if (dragRef.current!==null) {
        console.log('initDragEvents');
        dragRef.current.addEventListener('dragenter', handleDragIn);
        dragRef.current.addEventListener('dragleave', handleDragOut);
        dragRef.current.addEventListener("dragover", handleDragOver);
        dragRef.current.addEventListener('drop', handleDrop);
    }
    }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

    const resetDragEvents = useCallback(() => {
        if(dragRef.current!==null) {
            dragRef.current.removeEventListener('dragenter', handleDragIn);
            dragRef.current.removeEventListener('dragleave', handleDragOut);
            dragRef.current.removeEventListener("dragover", handleDragOver);
            dragRef.current.removeEventListener('drop', handleDrop);
        }
    }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);
    
    useEffect(() => {
        console.log('drag');

        initDragEvents();
        return resetDragEvents();
    }, [initDragEvents, resetDragEvents]);

    const onChangeFiles = useCallback((e: ChangeEvent<HTMLInputElement> | any): void => {
        let selectFiles: File[] = [];
        let tempFiles: FileTypes[] = files;
        // temp 변수를 이용하여 선택했던 파일들을 담습니다.
        
        // 드래그 했을 때와 안했을 때 가리키는 파일 배열을 다르게 해줍니다.
        if (e.type === "drop") {
            // 드래그 앤 드롭 했을때
            selectFiles = e.dataTransfer.files;
        } else {
            // "파일 첨부" 버튼을 눌러서 이미지를 선택했을때
            selectFiles = e.target.files;
        }

        setFiles(tempFiles);
        }, [files]); // 위에서 선언했던 files state 배열을 deps에 넣어줍니다.
    return (
        <>
        {
            dragging &&
            <DragOver 
                ref={dragRef} 
            >
                {/* <input
                    type="file"
                    id="fileUpload"
                    style={{ display: "none" }} // label을 이용하여 구현하기에 없애줌
                    multiple={true} // 파일 다중선택 허용
                    onChange={onChangeFiles}
                />
                <label
                    className={dragging ? "DragDrop-File-Dragging" : "DragDrop-File"}
                    // 드래그 중일때와 아닐때의 클래스 이름을 다르게 주어 스타일 차이
                    htmlFor="fileUpload"
                    ref={dragRef}
                ></label> */}
            </DragOver>
        }
        </>
    )
}

export default DragAndDrop;