import React, { useState } from "react";
import upload_area from "../../assets/upload_area.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMachines = () => {
  const [image, setImage] = useState(false);
  const [machineDetails, setMachineDetails] = useState({
    name: "",
    placeNum: "",
    broughtDate: "",
    price: "",
    description: "",
    nextRepairDate: "",
    image: "",
    cost: "",
    billNo: "",
    repairDate: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setMachineDetails({
      ...machineDetails,
      [e.target.name]: e.target.value,
    });
  };

  const addMachine = async () => {
    if (!machineDetails.name || !machineDetails.placeNum || !machineDetails.broughtDate) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!image) {
      toast.error("Please upload an image.");
      return;
    }

    let responseData;
    let machine = machineDetails;

    try {
      const formData = new FormData();
      formData.append("product", image);

      const uploadResp = await fetch("https://galoya-vishwa-erp-backend.onrender.com/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      responseData = await uploadResp.json();

      if (responseData.success) {
        machine.image = responseData.image_url;

        const saveResp = await fetch("https://galoya-vishwa-erp-backend.onrender.com/api/machines", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(machine),
        });

        const result = await saveResp.json();

        if (result.success) {
          toast.success("✅ Machine added successfully!");
          setMachineDetails({
            name: "",
            placeNum: "",
            broughtDate: "",
            price: "",
            description: "",
            nextRepairDate: "",
            image: "",
            cost: "",
            billNo: "",
            repairDate: "",
          });
          setImage(null);
        } else {
          toast.error("❌ Failed to add machine.");
        }
      } else {
        toast.error("❌ Image upload failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("❌ Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-[6px] p-8 w-full max-w-3xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 mb-6 text-center">
          Add Machine
        </h2>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Machine Name
              </label>
              <input
                value={machineDetails.name}
                onChange={changeHandler}
                type="text"
                name="name"
                placeholder="Enter machine name"
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-[6px] shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Place Number
              </label>
              <input
                value={machineDetails.placeNum}
                onChange={changeHandler}
                type="number"
                name="placeNum"
                placeholder="Enter place number"
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-[6px] shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Brought Date
              </label>
              <input
                value={machineDetails.broughtDate}
                onChange={changeHandler}
                type="date"
                name="broughtDate"
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-[6px] shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Next Repair Date
              </label>
              <input
                value={machineDetails.nextRepairDate}
                onChange={changeHandler}
                type="date"
                name="nextRepairDate"
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-[6px] shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                value={machineDetails.price}
                onChange={changeHandler}
                type="text"
                name="price"
                placeholder="Enter price"
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-[6px] shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={machineDetails.description}
              onChange={changeHandler}
              name="description"
              placeholder="Enter description"
              className="form-textarea w-full px-4 py-2 border border-gray-300 rounded-[6px] shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="4"
            ></textarea>
          </div>

          <div className="mt-6">
            <label className="block font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <label htmlFor="file-input" className="block">
              <img
                src={image ? URL.createObjectURL(image) : upload_area}
                alt="Upload"
                className="w-32 h-32 object-cover border border-gray-300 rounded-[6px] cursor-pointer"
              />
            </label>
            <input
              onChange={imageHandler}
              type="file"
              name="image"
              id="file-input"
              hidden
            />
          </div>

          <button
            type="button"
            onClick={addMachine}
            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-[6px] shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
          >
            Add Machine
          </button>
        </form>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default AddMachines;
