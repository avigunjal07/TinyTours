import { useEffect, useState, useRef } from "react";
import { setPageTitle, getUserJwtToken } from "../utils.jsx";
import Navbar from "../components/Navbar.jsx";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import MultiSelect from "../components/MultiSelect.jsx";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import PhotoViewer from "../components/PhotoViewer.jsx";
import { useNavigate } from "react-router";

function NewTour() {
  const [newTour, setNewTour] = useState({
    title: "",
    description: "",
    cities: [],
    startDate: "",
    endDate: "",
    photos: [],
  });

  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  // AUTH
  const authenticator = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Auth failed: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // UPLOAD IMAGE
  const handleUpload = async () => {
    const fileInput = fileInputRef.current;

    if (!fileInput?.files?.length) {
      alert("Select file first");
      return;
    }

    const file = fileInput.files[0];

    try {
      const auth = await authenticator();

      const uploadResponse = await upload({
        file,
        fileName: file.name,
        ...auth,
        onProgress: (event) => {
          setProgress(Math.round((event.loaded / event.total) * 100));
        },
      });

      // ✅ IMPORTANT FIX (SAFE STATE UPDATE)
      setNewTour((prev) => ({
        ...prev,
        photos: [...prev.photos, uploadResponse.url],
      }));

      setProgress(0);
      fileInput.value = "";
    } catch (error) {
      console.log(error);

      if (error instanceof ImageKitAbortError)
        console.error("Upload aborted");
      else if (error instanceof ImageKitInvalidRequestError)
        console.error("Invalid request");
      else if (error instanceof ImageKitUploadNetworkError)
        console.error("Network error");
      else if (error instanceof ImageKitServerError)
        console.error("Server error");
      else console.error(error);
    }
  };

  // CREATE TOUR
  const addTour = async () => {
    try {
      const token = getUserJwtToken();

      // ✅ FIX: force latest state snapshot
      const payload = {
        ...newTour,
        photos: [...newTour.photos],
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/tours`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Tour created successfully!");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  useEffect(() => {
    setPageTitle("Add Tour - TinyTours");
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Add New Tour</h1>

      <div className="w-80 mx-auto mt-10">

        <Input
          type="text"
          placeholder="Enter Title"
          value={newTour.title}
          onChange={(e) =>
            setNewTour({ ...newTour, title: e.target.value })
          }
        />

        <Input
          type="text"
          placeholder="Enter Description"
          value={newTour.description}
          onChange={(e) =>
            setNewTour({ ...newTour, description: e.target.value })
          }
        />

        <MultiSelect
          selectedItems={newTour.cities}
          onAddItem={(val) =>
            setNewTour((prev) => ({
              ...prev,
              cities: [...prev.cities, val],
            }))
          }
          onRemoveItem={(val) =>
            setNewTour((prev) => ({
              ...prev,
              cities: prev.cities.filter((c) => c !== val),
            }))
          }
        />

        <Input
          type="date"
          value={newTour.startDate}
          onChange={(e) =>
            setNewTour({ ...newTour, startDate: e.target.value })
          }
        />

        <Input
          type="date"
          value={newTour.endDate}
          onChange={(e) =>
            setNewTour({ ...newTour, endDate: e.target.value })
          }
        />

        {/* IMAGES PREVIEW */}
        <div className="flex gap-2 flex-wrap">
          {newTour.photos.length > 0 ? (
            newTour.photos.map((img, i) => (
              <PhotoViewer key={i} imgUrl={img} index={i} />
            ))
          ) : (
            <p className="text-gray-500">No images uploaded</p>
          )}
        </div>

        {/* UPLOAD */}
        <Input
          type="file"
          ref={fileInputRef}
          onChange={(e) => e.target.files?.length && handleUpload()}
        />

        {progress > 0 && <p>Uploading... {progress}%</p>}
      </div>

      <div className="w-80 mx-auto mt-10">
        <Button title="Create Tour" onClick={addTour} />
      </div>

      <Toaster />
    </div>
  );
}

export default NewTour;