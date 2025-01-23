
import {format} from 'date-fns'
import { Link } from 'react-router-dom';
const PetCard = ({pet}) => {
    const {petName, petAge, category, image, shortDesc, deadline, ownerImg, ownerName, _id} = pet || {};
    return (
        <div className="">
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
                <div className="badge badge-secondary">{category}</div>
                </h2>
                 <p className="mb-0">Age: {petAge}</p>
                 <p className="mb-0">Publish Date: {format(new Date(deadline), "P")}</p>
                 <div className="flex items-center mt-0">
                    <p>Owner: {ownerName}</p>
                     {/* owner img */}
                     <div className="avatar">
                        <div className="w-12 rounded-full">
                        <img src={ownerImg} />
                        </div>
                    </div>
                 </div>
                 <p className="">Description: {shortDesc}</p>
                <div className="card-actions justify-end">
                   <Link className="badge badge-outline" to={`/petDetails/${_id}`}>View Details</Link>
                </div>
            </div>
            </div>
        </div>
       
    );
};

export default PetCard;