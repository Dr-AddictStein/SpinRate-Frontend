import React from 'react';
import laptop from '../../../assets/laptop.png';

export default function Setting() {
    return (
        <div className='px-5 py-8'>
            <h2 className='lg:text-4xl text-3xl font-bold text-center text-gray-800 mb-8'>
                Instant and Easy Settings
            </h2>

            <div className='flex flex-wrap gap-8 items-center justify-between lg:flex-row flex-col'>


                <div className='lg:w-[48%] w-full'>
                    <iframe
                        className='w-full h-[250px] lg:h-[350px] rounded-lg shadow-md transition-transform transform hover:scale-105'
                        src="https://www.youtube.com/embed/h-TzzGQLs-8?si=4-djrCWTY6Bdy7Ri"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>

                <div className='lg:w-[48%] w-full flex justify-center lg:justify-end'>
                    <img
                        src={laptop}
                        alt="laptop"
                        className='rounded-lg  transition-transform transform hover:scale-105  w-full '
                    />
                </div>


            </div>
        </div>
    );
}
