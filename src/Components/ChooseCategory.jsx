

const ChooseCategory = () => {
    return (
        <div className='mt-10'>
            <h3 className='text-center text-3xl font-bold'>--Your Categories--</h3>
             <div className='grid grid-cols-7 gap-6 mt-10'>
                <div className="avatar">
                    <div className=" rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                        <img src="https://i.ibb.co.com/4VB4Y8C/petdogs.webp" alt="dog image" />
                    </div>
                </div> 
                <div className="avatar">
                    <div className="rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                        <img src="https://i.ibb.co.com/Hxxr6Sf/petcat.png" />
                    </div>
                </div>
                 <div className="avatar">
                    <div className="rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                        <img src="https://i.ibb.co.com/sQGC2Hq/petrabbit.jpg" />
                    </div>
                </div> 
                <div className="avatar">
                    <div className="rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                        <img src="https://i.ibb.co.com/JxJtySs/pet-Hamster.webp" />
                    </div>
                </div>  
                  <div className="avatar">
                    <div className="rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                        <img src="https://i.ibb.co.com/0jHdJ50/petparrots.webp" />
                    </div>
                </div>   
                 <div className="avatar">
                    <div className="rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                        <img src="https://i.ibb.co.com/zRbMwM5/petfish.jpg" />
                    </div>
                </div>   
                 <div className="avatar">
                    <div className="rounded-full ring-primary ring-offset-base-100 ring ring-offset-2">
                        <img src="https://i.ibb.co.com/rp5T0Vv/petturtles.png" />
                    </div>
                </div>  
             </div>
        </div>
    );
};

export default ChooseCategory;