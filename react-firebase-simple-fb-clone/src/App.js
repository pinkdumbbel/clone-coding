import React from 'react';
import Header from './Components/Header';
import Iframe from './Components/Iframe';
import Sidebar from './Components/Sidebar';

function App() {
    return (
        <div className='app'>
            {/* header */}
            <Header />
            <div className='app__contents'>
                {/* sidebar */}
                <div className='iframe__fixed'>
                    <link
                        data-frame
                        type="text/css"
                        rel="stylesheet"
                        href="./Sidebar.css"
                    />
                    <Iframe
                        title="sideBar"
                        styleSelector="link[data-frame]"
                    >
                        <Sidebar />
                    </Iframe>
                </div>
                {/* feed */}

                {/* friends*/}
            </div>
        </div>

    );
}

export default App;