

const Achievements = () => {
    return (
        <div className='mt-20 flex flex-col md:flex-row justify-between px-4 gap-4'>
                <div className=''>
                    <img src="https://i.ibb.co.com/9yV10fY/protect-animal.jpg" className='rounded-xl' alt="a girl with her pet dog" />
                </div>
            <div className='w-full md:w-[50%] space-y-5'>
                <h5 className="text-lg font-semibold">--Achievements</h5>
                <h3 className='text-3xl font-bold ml-2 uppercase'>A LOT OF ANIMALS NEED OUR PROTECTION</h3>
                <p>
                "We are proud to have achieved significant milestones in protecting pet animals. Through rescue efforts, community awareness programs, and adoption initiatives, we’ve provided countless pets with loving homes and better care. These achievements inspire us to continue advocating for the safety and happiness of animals."</p>
                {/* stat */}
                <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
                <div className="stat">
                        <div className="stat-value">760</div>
                        <div className="stat-desc text-lg font-semibold">Poaching cases</div>
                    </div>

                    <div className="stat">
                        <div className="stat-value">220</div>
                        <div className="stat-desc text-lg font-semibold">Rescued animals</div>
                    </div>

                    <div className="stat">
                        <div className="stat-value">130</div>
                        <div className="stat-desc text-lg font-semibold">Volunteers</div>
                    </div>
                </div>
            </div>
         
        </div>
    );
};

export default Achievements;