"use client";
import { useRouter } from 'next/navigation';
import { useFormik } from "formik";
import * as Yup from "yup";
const addProductSchema = Yup.object().shape({});

import toast from "react-hot-toast";
import { useState } from "react";
import useSellerContext from "@/context/SellerContext";
import { IconCirclePlus } from '@tabler/icons-react';

const productCategories = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Sports & Outdoors",
  "Health & Beauty",
  "Toys & Games",
  "Books",
  "Automotive",
  "Grocery",
  "Pet Supplies",
  "Office Supplies",
  "Baby Products",
  "Jewelry",
  "Musical Instruments",
  "Tools & Home Improvement",
  "Computers & Accessories"
]

const Addproduct = () => {
  const router = useRouter();
  // const [selFile, setSelFile] = useState("");

  const { currentSeller } = useSellerContext();

  const [features, setFeatures] = useState([
    'features1',
    'features2'
  ]);

  const addProductForm = useFormik({
    initialValues: {
      pname: "",
      pdetail: "",
      pprice: "",
      category: "",
      images: [],
      createdAt: "",
    },

    onSubmit: async (values, action) => {
      values.features = features;
      console.log(values);
      const res = await fetch("http://localhost:5000/product/add", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          "x-auth-token": currentSeller.token
        },
      });
      console.log(res.status);
      action.resetForm();
      if (res.status === 200) {
        toast("Item uploaded successfully");
        router.push('/seller/manageProduct');
      } else {
        toast("Something went wrong");
      }
    },
    validationSchema: addProductSchema,
  });

  const uploadFile = (e) => {
    const file = e.target.files[0];
    console.log(file);

    const fd = new FormData();
    fd.append("myfile", file);

    fetch("http://localhost:5000/util/uploadfile", { method: "POST", body: fd })
      .then((response) => {
        if (response.status === 200) {
          toast.success("file Uploaded");
          response.json().then((data) => {
            addProductForm.values.images[0] = file.name;
          });
        } else {
          toast.success("some error occured");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("some error occured");
      });
  };

  const updateFeatures = (index, key, value) => {
    let temp = features;
    temp[index][key] = value;
    setFeatures([...temp]);
  };

  const addFeature = () => {
    setFeatures([...features, { name: "", value: "" }]);
  };

  return (
    <div className='w-full'>
      <div className='bg-white shadow-md rounded-lg py-10 px-8 '>
        <h1 className='font-bold text-3xl my-6 text-gray-800'>Add New Product</h1>
        <form
          onSubmit={addProductForm.handleSubmit}
          className="text-gray-900"
        >
          <div className="form-group">
            <label htmlFor="pname" className="mb-3">
              Product Name
            </label>
            <input
              type="text"
              name="pname"
              onChange={addProductForm.handleChange}
              value={addProductForm.values.pname}
              className="w-full bg-gray-100 py-2 px-4 rounded mb-3"
              placeholder='Product Name'
              required=""
            />
          </div>

          <div className="form-group">
            <label htmlFor="pdetail" className="mb-2">
              Product Detail
            </label>
            <textarea
              name="pdetail"
              onChange={addProductForm.handleChange}
              value={addProductForm.values.pdetail}
              placeholder='Product Detail'
              className="w-full bg-gray-100 py-2 px-4 rounded mb-3"
              required=""
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="pprice" className="mb-3">
              Product Price
            </label>
            <input
              type="number"
              name="pprice"
              onChange={addProductForm.handleChange}
              value={addProductForm.values.pprice}
              placeholder='Product Price'
              className="w-full bg-gray-100 py-2 px-4 rounded mb-3"
              required=""
            />
          </div>
          <div className="form-group">
            <label htmlFor="pcategory" className="mb-2">
              Product Category
            </label>
            <select
              name="category"
              onChange={addProductForm.handleChange}
              value={addProductForm.values.category}
              className="w-full bg-gray-100 py-2 px-4 rounded mb-3"
              required=""
            >
              {
                productCategories.map((category, index) => {
                  return (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  );
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="pcategory" className="mb-2">
              Product Features
            </label>

            {features.map((feature) => (

              <input
                onChange={(e) => {
                  setFeatures((prev) => {
                    const temp = [...prev];
                    temp[features.indexOf(feature)] = e.target.value;
                    return temp;
                  });
                }}
                value={feature}
                type="text"
                className='w-full bg-gray-100 py-2 px-4 rounded mb-3'
              />

            ))}
            <button type="button" className="bg-blue-500 rounded-full text-white p-2 ms-2" onClick={() => {
              setFeatures((prev) => {
                const temp = [...prev];
                temp.push("");
                return temp;
              });
            }}>

              <IconCirclePlus />
            </button>
          </div>

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-58 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or
                  drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                name="images"
                id="dropzone-file"
                type="file"
                onChange={uploadFile}
                className="hidden"
              />
            </label>
          </div>

          <div className="mt-3">
            <button
              type="submit"
              className="bg-red-500 text-white  mb-5 w-full py-1 rounded-lg"
            >
              {" "}
              Add Product
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Addproduct;
