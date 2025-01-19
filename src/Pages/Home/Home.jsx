import Navbar from '../../Components/Navbar';
import Banner from '../../Components/Banner';
import ChooseCategory from '../../Components/ChooseCategory';

const Home = () => {
    return (
        <div className='container mx-auto'>
             <Navbar></Navbar>
             <Banner></Banner>
              <div className='max-w-7xl mx-auto'>
                 <ChooseCategory></ChooseCategory>
              </div>
        </div>
    );
};

export default Home;