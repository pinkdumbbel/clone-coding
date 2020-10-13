import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Iframe({ children, styleSelector, title, }) {
    const [contentRef, setContentRef] = useState(null);
    const mountNode = contentRef?.contentWindow?.document.body;

    useEffect(() => {
        if (!contentRef) {
            return;
        }
        const win = contentRef?.contentWindow;
        const linkEls = win.parent.document.querySelectorAll(
            styleSelector
        );
        if (linkEls.length) {
            linkEls.forEach((el) => {
                win.document.head.appendChild(el);
            });
        }
    }, [contentRef, styleSelector]);

    return (
        <iframe title={title} frameBorder={0} style={{ width: '335px', height: '100vh' }} ref={setContentRef}>
            {mountNode && createPortal(children, mountNode)}
        </iframe>
    );
}

export default Iframe;