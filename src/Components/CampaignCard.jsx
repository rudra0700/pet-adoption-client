import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';

const CampaignCard = ({campaign}) => {
    const {petName, image, deadline, maxAmount, shortDesc, _id} = campaign || {}
    return (
        <div>
             <div className="card bg-base-100 shadow-xl">
            <figure>
                <img
                className="w-72 h-40 object-cover rounded-md"
                src={image}
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                 {petName}
                </h2>
                  <p className='font-semibold opacity-70'>Maximum Amount: $ {maxAmount}</p>
                 <p className="mb-0 font-semibold opacity-70">Deadline: {format(new Date(deadline), "P")}</p>
                 {/* <div className="flex items-center mt-0">
                 </div> */}
                 <p className="font-semibold opacity-70">{shortDesc}</p>
                <div className="card-actions justify-end">
                   <Link to={`/donationDetails/${_id}`} className="badge badge-outline font-semibold opacity-70">View Details</Link>
                </div>
            </div>
            </div>
        </div>
    );
};

export default CampaignCard;