import React, { useState } from "react";
import upload_area from "../../assets/upload_area.svg";

const AddMachines = () => {
  const [image, setImage] = useState(false);
  const [machineDetails, setMachineDetails] = useState({
    name: "",
    broughtDate: "",
    price: "",
    description: "",
    nextRepairDate: "",
    image: "",
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
    console.log(machineDetails);
    let responseData;
    let machine = machineDetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:5000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      machine.image = responseData.image_url;
      console.log(machine);
      await fetch("http://localhost:5000/api/machines", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(machine),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Machine Added") : alert("Failed");
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-3xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
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
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Price</label>
              <input
                value={machineDetails.price}
                onChange={changeHandler}
                type="text"
                name="price"
                placeholder="Enter price"
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                className="form-input w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
              className="form-textarea w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                className="w-32 h-32 object-cover border border-gray-300 rounded-md cursor-pointer"
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
            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
          >
            Add Machine
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMachines;
