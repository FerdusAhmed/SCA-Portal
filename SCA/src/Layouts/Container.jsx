import React from 'react';

const Container = ({children}) => {
    return (
        <div className='mx-auto md:max-w-7xl px-4 md:px-6 w-full'>
            {children} 
        </div>
    );
};

export default Container;