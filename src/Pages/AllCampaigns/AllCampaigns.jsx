import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CampaignCard from "../../Components/CampaignCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const AllCampaigns = () => {
    const axiosPublic = useAxiosPublic()
    const [sort, setSort] = useState('');
    
    // console.log(sort);
    const {data: campaigns = [], } = useQuery({
        queryKey: ["campaigns", sort],
        queryFn: async () => {
            const res = await axiosPublic.get(`/campaigns?sort=${sort}`);
            return res.data;
        }
    })

    const handleReset = () => {
        setSort('')
       }
    // console.log(campaigns);
    return (
        <div className='container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between'>
        <div>
          <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>
            <form>
              <div className='flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
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
               campaigns.map(campaign => <CampaignCard key={campaign._id} campaign={campaign}></CampaignCard>)
            }
          </div>
        </div>
      </div>
    );
};

export default AllCampaigns;