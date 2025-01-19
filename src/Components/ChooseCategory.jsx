import { Link } from "react-router-dom";


const ChooseCategory = () => {
    return (
        <div className='mt-10'>
             <h5 className="text-center text-lg font-semibold">--Meet Your Crime Partner--</h5>
            <h3 className='text-center text-3xl font-bold ml-2 uppercase'>Puppies Waiting for Adoption</h3>
             <div className='grid grid-cols-2 px-4 md:px-0 md:grid-cols-4 lg:grid-cols-7 gap-6 mt-10'>
                <Link className="avatar">
                    <div className=" rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                        <img src="https://i.ibb.co.com/4VB4Y8C/petdogs.webp" alt="dog image" />
                    </div>
                </Link> 
                <Link className="avatar">
                    <div className="rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                        <img src="https://i.ibb.co.com/Hxxr6Sf/petcat.png" />
                    </div>
                </Link>
                 <Link className="avatar">
                    <div className="rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                        <img src="https://i.ibb.co.com/sQGC2Hq/petrabbit.jpg" />
                    </div>
                </Link> 
                <Link className="avatar">
                    <div className="rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                        <img src="https://i.ibb.co.com/JxJtySs/pet-Hamster.webp" />
                    </div>
                </Link>  
                  <Link className="avatar">
                    <div className="rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                        <img src="https://i.ibb.co.com/0jHdJ50/petparrots.webp" />
                    </div>
                </Link>   
                 <Link className="avatar">
                    <div className="rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                        <img src="https://i.ibb.co.com/zRbMwM5/petfish.jpg" />
                    </div>
                </Link>   
                 <Link className="avatar">
                    <div className="rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                        <img src="https://i.ibb.co.com/rp5T0Vv/petturtles.png" />
                    </div>
                </Link>  
             </div>
        </div>
    );
};

export default ChooseCategory;