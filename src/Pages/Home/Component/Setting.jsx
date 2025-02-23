import React from 'react'
import laptop from '../../../assets/laptop.png'
export default function Setting() {
    return (
        <>


            <div className='px-10'>

                <div className='lg:text-3xl text-2xl font-semibold text-center'>
                    Instant and easy settings
                </div>


                <div className='grid grid-cols-1 gap-5 items-center'>


                    <div>

                        <iframe className='w-full h-[350px] py-5' src="https://www.youtube.com/embed/h-TzzGQLs-8?si=4-djrCWTY6Bdy7Ri" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>

                    <div>

                        <img src={laptop} alt="laptop" />
                    </div>

                </div>

            </div>


        </>
    )
}
