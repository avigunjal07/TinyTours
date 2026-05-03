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

  const authenticator = async () => {
    try {
      const response = await fetch`${import.meta.env.VITE_API_BASE_URL}/auth`;
      if (!response.ok) {
        // If the server response is not successful, extract the error text for debugging.
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`,
        );
      }

      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }

    const file = fileInput.files[0];

    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
      });

      setNewTour({
        ...newTour,
        photos: [...newTour.photos, uploadResponse.url],
      });
      setProgress(0);
      fileInput.value = "";
    } catch (error) {
      console.log(error);

      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
      }
    }
  };
 
const navigate = useNavigate();

const addTour = async () => {
  try {
    const token = getUserJwtToken();

    const response = await axios.post(
     `${import.meta.env.VITE_API_BASE_URL}/tours`,
      newTour,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      toast.success("Tour added successfully!");
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
      <h1>Add new tour</h1>

      <div className="w-80 block mx-auto mt-10">
        <Input
          type={"text"}
          placeholder={"Enter Title"}
          value={newTour.title}
          onChange={(e) => {
            setNewTour({
              ...newTour,
              title: e.target.value,
            });
          }}
        />
        <Input
          type={"text"}
          placeholder={"Enter Description"}
          value={newTour.description}
          onChange={(e) => {
            setNewTour({
              ...newTour,
              description: e.target.value,
            });
          }}
        />
        <MultiSelect
          selectedItems={newTour.cities}
          placeholder={"Enter City"}
          onAddItem={(val) => {
            setNewTour({
              ...newTour,
              cities: [...newTour.cities, val],
            });
          }}
          onRemoveItem={(val) => {
            setNewTour({
              ...newTour,
              cities: newTour.cities.filter((city) => city !== val),
            });
          }}
        />
        <Input
          type={"date"}
          placeholder={"Enter Start Date"}
          value={newTour.startDate}
          onChange={(e) => {
            setNewTour({
              ...newTour,
              startDate: e.target.value,
            });
          }}
        />
        <Input
          type={"date"}
          placeholder={"Enter End Date"}
          value={newTour.endDate}
          onChange={(e) => {
            setNewTour({
              ...newTour,
              endDate: e.target.value,
            });
          }}
        />
        <div className="flex gap-x-2">
          {newTour.photos?.map((photos, index) => (
            <PhotoViewer
              key={index}
              imgUrl={photos}
              index={index}
              onDelete={(url) => {
                setNewTour({
                  ...newTour,
                  photos: newTour.photos.filter((photo) => photo !== url),
                });
              }}
              showDelete
            />
          ))}
        </div>
        <Input
          type={"file"}
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files.length > 0) {
              handleUpload();
            }
          }}
        />
        {progress > 0 ? `Uploading... ${progress}%` : null}
      </div>

      <div className="w-80 block mx-auto mt-10">
        <Button title="Add Tour" onClick={addTour} />
      </div>
      <Toaster />
    </div>
  );
}

export default NewTour;