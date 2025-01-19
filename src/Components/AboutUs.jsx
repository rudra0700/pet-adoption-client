import React from 'react';

const AboutUs = () => {
    return (
        <div className='mt-20 flex flex-col md:flex-row justify-between items-center px-4 gap-4'>
            <div className='w-full md:w-[50%] space-y-5'>
                <h5 className="text-lg font-semibold">--Our Work</h5>
                <h3 className='text-3xl font-bold ml-2 uppercase'>OUR MAIN GOAL IS TOPROTECT ANIMALS</h3>
                <p>"Our mission is to protect animals and ensure their well-being. By preserving natural habitats and advocating for responsible care, we create a safer world for all species. Together, we strive to nurture compassion, raise awareness, and foster harmony between humans and animals."</p>
                <button className='btn'>More About</button>
            </div>
            <div className=''>
                <img src="https://i.ibb.co.com/9yV10fY/protect-animal.jpg" className='rounded-xl' alt="a girl with her pet dog" />
            </div>
        </div>
    );
};

export default AboutUs;