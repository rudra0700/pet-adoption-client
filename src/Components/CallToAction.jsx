

const CallToAction = () => {
    return (
        <div className="mt-20">
             <h5 className="text-center text-lg font-semibold">--What we do--</h5>
             <h3 className='text-center text-3xl font-bold ml-2'>WHAT WE DO TO PROTECT ANIMALS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20 gap-4 px-4 md:px-4 lg:px-0">
                    <div className="card bg-base-100 shadow-xl">
                        <figure>
                            <img
                            className="w-96 h-96 object-cover"
                            src="https://i.ibb.co.com/CP8ZYrv/rescuedog.jpg"
                            alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Raising money to help</h2>
                            <p>"Empowering dog care with love and dedication. Together, we ensure every dog receives the nurturing and happiness they truly deserve."</p>
                            <div className="card-actions justify-end">
                            </div>
                        </div>
                    </div> 
                     <div className="card bg-base-100 shadow-xl">
                        <figure>
                            <img
                            className="w-96 h-96 object-cover"
                            src="https://i.ibb.co.com/42p2252/closeservices.jpg"
                            alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Close work with services</h2>
                            <p>
                            "Dedicated to excellence, we work closely with our services, ensuring every dog receives personalized care, compassion, and a loving experience."</p>
                            <div className="card-actions justify-end">
                            </div>
                        </div>
                    </div>
                      <div className="card bg-base-100 shadow-xl">
                        <figure>
                            <img
                            className="w-96 h-96 object-cover"
                            src="https://i.ibb.co.com/hm9s49y/proguidtour.jpg"
                            alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Pro guided tours only</h2>
                            <p>"Experience safe, memorable tours led by professional guides. Our experts ensure every adventure is enjoyable, educational, and worry-free for all."</p>
                            <div className="card-actions justify-end">
                            </div>
                        </div>
                    </div> 
                     <div className="card bg-base-100 shadow-xl">
                        <figure>
                            <img
                            className="w-96 h-96 object-cover"
                            src="https://i.ibb.co.com/RbwKkHT/protectanimalarea.jpg"
                            alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Protecting animal area</h2>
                            <p>"Committed to preserving animal habitats, we actively protect wildlife areas, ensuring a safe and thriving environment for animals to flourish."</p>
                            <div className="card-actions justify-end">
                            </div>
                        </div>
                    </div>
              </div>
        </div>
    );
};

export default CallToAction;