import { useEffect } from "react";
import { setPageTitle } from "../utils.jsx";

function EditTour() {
  useEffect(() => {
    setPageTitle("Edit Tour - TinyTours");
  }, []);

  return <div>EditTour</div>;
}

export default EditTour;