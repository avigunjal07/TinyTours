import { Building2, Footprints, LandPlot } from "lucide-react";
import Avatar from "./Avatar.jsx";
import PhotoViewer from "./PhotoViewer.jsx";

function TourCard({
  _id,
  title,
  description,
  cities,
  photos,
  user,
  startDate,
  endDate,
  createdAt,
  updatedAt,
}) {
  const { name, email } = user;

  return (
    <div className="border border-gray-500 px-4 py-2 rounded-md shadow-md">
      <h2 className="text-xl">{title}</h2>
      <p className="text-xs text-gray-500">{description}</p>
      <p className="my-2">
        <Building2 className="inline-block mr-1" />{" "}
        {cities.map((city) => {
          return (
            <span
              key={city}
              className="mr-2 text-sm bg-gray-300 px-4 py-0.5 rounded-full"
            >
              {city}
            </span>
          );
        })}
      </p>

      <p className="flex items-center my-2 text-sm">
        <Footprints className="mx-2 h-6 w-6"/> Started on: {new Date(startDate).toLocaleDateString()}{" "}
        and
        <LandPlot  className="ml-4 mr-2 h-6 w-6"/>
        Ended on: {new Date(endDate).toLocaleDateString()}
      </p>

      <div className="flex items-center">
        <span className="mr-2">Posted by:</span>{" "}
        <Avatar name={name} size={"small"} /> <strong>{name}</strong> ({email})
      </div>

      <div className="flex">
        {photos.map((photo, index) => {
          return PhotoViewer({ imgUrl: photo, index });
        })}
      </div>
    </div>
  );
}

export default TourCard;