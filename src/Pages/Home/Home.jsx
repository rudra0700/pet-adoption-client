import Navbar from '../../Components/Navbar';
import Banner from '../../Components/Banner';
import ChooseCategory from '../../Components/ChooseCategory';
import CallToAction from '../../Components/CallToAction';
import AboutUs from '../../Components/AboutUs';
import Achievements from '../../Components/Achievements';
import Testimonial from '../../Components/Testimonial';


const Home = () => {
    return (
        <div className='container mx-auto'>
             <Navbar></Navbar>
             <Banner></Banner>
              <div className='max-w-7xl mx-auto'>
                 <ChooseCategory></ChooseCategory>
              </div>
              <div className='max-w-7xl mx-auto'>
                  <CallToAction></CallToAction>
              </div>
               <div className='max-w-7xl mx-auto'>
                  <AboutUs></AboutUs>
               </div>
                <div className='max-w-7xl mx-auto'>
                  <Achievements></Achievements>
               </div>
                <div className='max-w-7xl mx-auto'>
                 <Testimonial></Testimonial>
               </div>
        </div>
    );
};

export default Home;