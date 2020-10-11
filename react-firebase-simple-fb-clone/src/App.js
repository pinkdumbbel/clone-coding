import React from 'react';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';

function App() {
    return (
        <div className='app'>
            {/* header */}
            <Header />
            <div className='app__contents'>
                {/* sidebar */}
                <Sidebar />
                {/* feed */}
                {/* friends*/}
            </div>
        </div>

    );
}

export default App;