
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { FaQuoteRight } from "react-icons/fa";

const Testimonial = () => {
    return (
        <div className='mt-20'>
                 <h5 className="text-lg font-semibold text-center">--Testimonial</h5>
                 <h3 className='text-3xl font-bold ml-2 uppercase text-center'>WHAT PEOPLE SAYS ABOUT US</h3>
                 <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper min-h-[300px]"
      >
        <SwiperSlide>
            <div>
                <FaQuoteRight className='mx-auto mt-10 text-5xl'></FaQuoteRight>
                <p className='text-center text-lg'>"Amazing experience! The adoption process was smooth, and the team was incredibly supportive. Thanks to them, we <br /> found our perfect furry companion!"</p>
                <div className='flex gap-2 justify-center mt-8 items-center'>
                        <div className="avatar">
                            <div className="w-16 rounded-full">
                               <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                     <div>
                        <h4 className='font-semibold'>Aliza Victor</h4>
                        <p className='font-semibold'>Customer</p>
                     </div>
                </div>
            </div>
        </SwiperSlide>  <SwiperSlide>
            <div>
                <FaQuoteRight className='mx-auto mt-10 text-5xl'></FaQuoteRight>
                <p className='text-center text-lg'>"A wonderful service! They truly care about the pets and ensure they find the right home. Highly <br />recommend their adoption platform."</p>
                <div className='flex gap-2 justify-center mt-8 items-center'>
                        <div className="avatar">
                            <div className="w-16 rounded-full">
                               <img src="https://i.ibb.co.com/C863Rvq/jone-smith.jpg" />
                            </div>
                        </div>
                     <div>
                        <h4 className='font-semibold'>John Smith</h4>
                        <p className='font-semibold'>Customer</p>
                     </div>
                </div>
            </div>
        </SwiperSlide>  <SwiperSlide>
            <div>
                <FaQuoteRight className='mx-auto mt-10 text-5xl'></FaQuoteRight>
                <p className='text-center text-lg'>"Such a heartfelt mission! Their dedication to pets' well-being shines through every step of the adoption <br /> process. We couldn’t be happier!"</p>
                <div className='flex gap-2 justify-center mt-8 items-center'>
                        <div className="avatar">
                            <div className="w-16 rounded-full">
                               <img src="https://i.ibb.co.com/jvR8wb4/david-browns.webp" />
                            </div>
                        </div>
                     <div>
                        <h4 className='font-semibold'>David Browns</h4>
                        <p className='font-semibold'>Customer</p>
                     </div>
                </div>
            </div>
        </SwiperSlide>  <SwiperSlide>
            <div>
                <FaQuoteRight className='mx-auto mt-10 text-5xl'></FaQuoteRight>
                <p className='text-center text-lg'>"Incredible team and excellent service. They made the adoption process easy and guided us to <br /> provide the best care for our new pet!"</p>
                <div className='flex gap-2 justify-center mt-8 items-center'>
                        <div className="avatar">
                            <div className="w-16 rounded-full">
                               <img src="https://i.ibb.co.com/FX1YxwF/martin-thompson.jpg" />
                            </div>
                        </div>
                     <div>
                        <h4 className='font-semibold'>Martin Thompson</h4>
                        <p className='font-semibold'>Customer</p>
                     </div>
                </div>
            </div>
        </SwiperSlide>
      
       
      </Swiper>
        </div>
    );
};

export default Testimonial;