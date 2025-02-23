import React from 'react';
import { Triangle } from 'react-loader-spinner'

const Loader = ({ text }) => {
    return (
        <div className="h-80 w-80 flex flex-col justify-center items-center bg-transparent rounded-md">
            <Triangle
                visible={true}
                height="200"
                width="200"
                color="#000000"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
            <p className='text-black font-bold text-2xl mt-6'>{text}</p>
        </div>
    );
};

export default Loader;
