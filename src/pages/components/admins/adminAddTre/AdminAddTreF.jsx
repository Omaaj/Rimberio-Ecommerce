import React, { useState } from 'react';
import "./AdminAddTre.css";
import { motion } from 'framer-motion';
import { db, storage } from '../../../../fireBase/config';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../../redux/slice/productSlice';

const initailState = {
    productId : "",
    title : "",
    oldPrice : 0,
    price : 0,
    img : "",
}

export default function AdminAddTreF() {
    const {id} = useParams();

    const productss = useSelector(selectProducts);
  
    const productsEdit = productss.find((item) => item.id === id);
  
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
        const storageRef = ref(storage, `rimberioss3/${Date.now()}${file.name}`);
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
        try {
          const docRef = addDoc(collection(db, "featued-products"), {
            productId: products.productId,
            title: products.title,
            oldPrice : Number(products.oldPrice),
            price : Number(products.price),
            img : products.img,
            createdAt : Timestamp.now().toDate()
          });
          setUploadProgress(0)
          setProducts({...initailState})
          toast.success("Product Uploaded Sucessfully");
          navigate("/admin/all-featured-products")
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
          setDoc(doc(db, "featued-products", id), {
            productId: products.productId,
            title: products.title,
            oldPrice : Number(products.oldPrice),
            price : Number(products.price),
            img : products.img,
            createdAt : productsEdit.createdAt,
            editedAt : Timestamp.now().toDate()
          });
          toast.success("Product Edited Succesfully");
          navigate("/admin/all-featured-products")
        } catch (error) {
          toast.error(error.message);
        }
      }

      return (
        <div className='admin_productss'>
          <h1>{detectForm(id, "Add Featured Product", "Edit Product")}</h1>
          <div className="cards">
            <form onSubmit={detectForm(id, addProducts, editProducts)}>
              <div className="input_change">
                <label>Product ID:</label>
                <input 
                  type="text" 
                  placeholder='Product ID'
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
                  name='title'
                  value={products.title}
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
                <label>Product Old-Price :</label>
                <input 
                  type="number" 
                  placeholder='Product Old-Price'
                  name='oldPrice'
                  value={products.oldPrice}
                  onChange={(e) => handleInputChange(e)}
                  // required  
                />
              </div>
              <div className="input_change">
                <label>Product Price :</label>
                <input 
                  type="number" 
                  placeholder='Product Price'
                  name='price'
                  value={products.price}
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
