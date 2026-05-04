import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import Navbar from "../components/Navbar.jsx";
import toast from "react-hot-toast";

function EditTour() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState({
  title: "",
  description: "",
  startDate: "",
  endDate: "",
});

  useEffect(() => {
    const fetchTour = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/tours`
      );

      const found = res.data.data.find((t) => t._id === id);
      if (found) setTour(found);
    };

    fetchTour();
  }, [id]);

  const updateTour = async () => {
    try {
      const token = localStorage.getItem("userJwtToken");

      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/tours/${id}`,
        tour,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Tour updated");
        navigate("/");
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="w-96 mx-auto mt-10">
        <Input
          value={tour.title}
          onChange={(e) =>
            setTour({ ...tour, title: e.target.value })
          }
        />

        <Input
          value={tour.description}
          onChange={(e) =>
            setTour({ ...tour, description: e.target.value })
          }
        />

        <Input
  type="date"
  value={tour.startDate ? tour.startDate.substring(0, 10) : ""}
  onChange={(e) =>
    setTour({ ...tour, startDate: e.target.value })
  }
/>

<Input
  type="date"
  value={tour.endDate ? tour.endDate.substring(0, 10) : ""}
  onChange={(e) =>
    setTour({ ...tour, endDate: e.target.value })
  }
/>

        <Button title="Update Tour" onClick={updateTour} />
      </div>
    </div>
  );
}

export default EditTour;