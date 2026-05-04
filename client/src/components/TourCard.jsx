import { Building2, Footprints, LandPlot } from "lucide-react";
import Avatar from "./Avatar.jsx";
import PhotoViewer from "./PhotoViewer.jsx";
import { useNavigate } from "react-router";

function TourCard({
  _id,
  title,
  description,
  cities,
  photos=[],
  user,
  startDate,
  endDate,
}) {
  const { name, email } = user;
  const navigate = useNavigate();

  return (
    <div className="bg-blue-100 border border-blue-200 rounded-xl p-4 space-y-3">

      <h2 className="text-lg font-semibold text-black">{title}</h2>

      <p className="text-sm text-black">{description}</p>

      <div className="flex flex-wrap items-center gap-2 text-sm text-black">
        <Building2 className="h-4 w-4" />
        {cities.map((city) => (
          <span key={city} className="px-3 py-1 bg-blue-200 rounded-full text-xs">
            {city}
          </span>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 text-sm text-black">
        <div className="flex items-center gap-2">
          <Footprints className="h-4 w-4" />
          <span>Start: {new Date(startDate).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center gap-2">
          <LandPlot className="h-4 w-4" />
          <span>End: {new Date(endDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-black">
        <span>Posted by:</span>
        <Avatar name={name} size="small" />
        <span>{name}</span>
        <span>({email})</span>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {photos?.length > 0 ? (
  photos.map((photo, index) => (
    <PhotoViewer key={index} imgUrl={photo} index={index} />
  ))
) : (
  <p className="text-sm text-gray-500">No images uploaded</p>
)}
      </div>
      <button
  onClick={() => navigate(`/tours/edit/${_id}`)}
  className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
>
  Edit Tour
</button>
      

    </div>
  );
}

export default TourCard;