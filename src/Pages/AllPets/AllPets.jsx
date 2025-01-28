import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
import PetCard from "../../Components/PetCard";


const AllPets = () => {
    // const [jobs, setJobs] = useState([]);
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
     const axiosPublic = useAxiosPublic()
    const {data: pets = [], isLoading} = useQuery({
       queryKey: ["pets", filter, search, sort],
       queryFn: async () => {
         const res = await axiosPublic.get(`/pets?filter=${filter}&search=${search}&sort=${sort}`);
         return res.data
       }
    })
    console.log(pets);
    if(isLoading) return <p>Loading...</p>

    const handleReset = () => {
        setFilter('')
        setSearch('')
        setSort('')
       }
    return (
        <div className='container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between'>
        <div>
          <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>
            <div>
              <select
                name='category'
                id='category'
                onChange={(e) => setFilter(e.target.value)}
                className='border p-4 rounded-lg'
                value={filter}
              >
                <option value=''>Filter By Category</option>
                <option value='dog'>Dog</option>
                <option value='cat'>Cat</option>
                <option value='rabbit'>Rabbit</option>
                <option value='hamster'>Hamster</option>
                <option value='parrot'>Parrot</option>
                <option value='fish'>Fish</option>
                <option value='turtle'>Turtle</option>
                
              </select>
            </div>
  
            <form>
              <div className='flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
                <input
                  className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                  type='text'
                  name='search'
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Enter Job Title'
                  aria-label='Enter Job Title'
                  value={search}
                />
  
                <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                  Search
                </button>
              </div>
            </form>
            <div>
              <select
                name='category'
                id='category'
                onChange={(e) => setSort(e.target.value)}
                className='border p-4 rounded-md'
                value={sort}
              >
                <option value=''>Sort By Publish Date</option>
                <option value='dsc'>Descending Order</option>
                <option value='asc'>Ascending Order</option>
              </select>
            </div>
            <button className='btn' onClick={handleReset}>Reset</button>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 max-w-7xl mx-auto'>
            {
               pets.map(pet => <PetCard key={pet._id} pet={pet}></PetCard>)
            }
          </div>
        </div>
      </div>
    );
};

export default AllPets;