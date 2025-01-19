import petBanner from '/petBanner (1).jpg'

const Banner = () => {
    return (
        <div className='px-4 md:px-0'>
             <div
  className="hero min-h-[600px] rounded-xl"
  style={{
    backgroundImage: `url('${petBanner}')`,
  }}>
  <div className="hero-overlay bg-opacity-60 rounded-xl"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-3xl md:text-5xl font-bold ">Your Puppy's Second Home</h1>
      <p className="mb-5">
      "Find loving homes for your furry friends. Adopt, don’t shop, and give every puppy the care they deserve today!"
      </p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default Banner;