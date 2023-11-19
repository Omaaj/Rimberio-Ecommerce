import React, { useState } from 'react';
import "./AdminAdd.css";
import { motion } from 'framer-motion';
import { db, storage } from '../../../../fireBase/config';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../../redux/slice/productSlice';
import { selectOffers } from '../../../../redux/slice/offersSlice';


const initailState = {
    productId : "",
    name : "",
    startTime : "",
    img : "",
}

export default function AdminAddOfe() {
    const {id} = useParams();

    // const productss = useSelector(selectProducts);
    const offerss = useSelector(selectOffers);
  
    const productsEdit = offerss.find((item) => item.id === id);
  
    const [products, setProducts] = useState(() => {
      const newState = detectForm(id,
        {...initailState},
        productsEdit
      )
      return newState
    });
    const [uploadProgress, setUploadProgress] = useState(0);
  
    const navigate = useNavigate();

    function detectForm(id, f1, f2) {
        if(id === "ADD") {
          return f1;
        }
        return f2
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
    
        setProducts({...products, [name] : value})
      }
    
      const handleImageChange = (e) => {
        const file = e.target.files[0]
        // console.log(file);
        const storageRef = ref(storage, `rimberiossOffer/${Date.now()}${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          }, 
          (error) => {
            toast.error(error.message)
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setProducts({...products, img : downloadURL})
              toast.success("Image Uploaded Succesfully")
            });
          }
        );
    
    }

    const addProducts = (e) => {
        e.preventDefault();
        console.log(products);
        try {
          const docRef = addDoc(collection(db, "offer-Products"), {
            productId: products.productId,
            name : products.name,
            startTime : products.startTime,
            img : products.img,
            createdAt : Timestamp.now().toDate()
          });
          setUploadProgress(0)
          setProducts({...initailState})
          toast.success("Product Uploaded Sucessfully");
          navigate("/admin/all-offers-products")
        } catch (error) {
          toast.error(error.message)
        }
    }

    const editProducts = (e) => {
        e.preventDefault();
        if(products.img !== productsEdit.img) {
          const storageRef = ref(storage, productsEdit.img);
          deleteObject(storageRef)
        }
        try {
          setDoc(doc(db, "offer-Products", id), {
            productId: products.productId,
            name : products.name,
            startTime : products.startTime,
            img : products.img,
            createdAt : productsEdit.createdAt,
            editedAt : Timestamp.now().toDate()
          });
          toast.success("Product Edited Succesfully");
          navigate("/admin/all-offers-products")
        } catch (error) {
          toast.error(error.message);
        }
      }

      return (
        <div className='admin_productss'>
          <h1>{detectForm(id, "Add Offers Product", "Edit Product")}</h1>
          <div className="cards">
            <form onSubmit={detectForm(id, addProducts, editProducts)}>
              <div className="input_change">
                <label>Product ID:</label>
                <input 
                  type="text" 
                  placeholder='Product Title'
                  name='productId'
                  value={products.productId}
                  onChange={(e) => handleInputChange(e)}
                  required  
                />
              </div>
              <div className="input_change">
                <label>Product Title:</label>
                <input 
                  type="text" 
                  placeholder='Product Title'
                  name='name'
                  value={products.name}
                  onChange={(e) => handleInputChange(e)}
                  required  
                />
              </div>
              <div className="input_change">
                <label>Product Image:</label>
                <div className="card_imge">
                  {
                    uploadProgress === 0 ? null : (
                      <div className="progress">
                        <div className="progress_bar" style={{width: `${uploadProgress}%`}}>
                          {
                            uploadProgress < 100 ? `Uploading ${uploadProgress}` : `Upload Completed ${uploadProgress}%`
                          }
                        </div>
                      </div>
                    )
                  }
                  <div className="input-images">
                    <input 
                      type="file" 
                      placeholder='Product Image'
                      accept='image/*'
                      name='image'
                      onChange={(e) => handleImageChange(e)}
                    />
                    {
                      products.img === "" ? null : (
                        <input 
                          type="text" 
                          name='img'
                          value={products.img}
                          placeholder='Image URL'
                          // required
                          disabled  
                        />
    
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="input_change">
                <label>Product StartTime :</label>
                <input 
                  type="text" 
                  placeholder='Product Brand'
                  name='startTime'
                  value={products.startTime}
                  onChange={(e) => handleInputChange(e)}
                  required  
                />
              </div>
              <motion.button whileTap={{scale : 0.9}} className='buttons'>{
                detectForm(id, "Save Products", "Edit Product")
              }</motion.button>
            </form>
          </div>
        </div>
      )
}
