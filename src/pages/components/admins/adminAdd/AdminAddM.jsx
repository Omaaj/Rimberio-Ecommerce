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

const initailState = {
  title : "",
  cat : "",
  brand : "",
  oldprice : 0,
  price : 0,
  img : "",
  bol : "",
  sun : "",
  tags : "",
  description : "",
  reviewdate : "",
  username : "",
  reviews : "There are no reviews for this product yet",
  rate : 0
}

export default function AdminAddM() {
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
  const [uploadProgress1, setUploadProgress1] = useState(0);
  const [uploadProgress2, setUploadProgress2] = useState(0);

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
    const storageRef = ref(storage, `rimberiossMen/${Date.now()}${file.name}`);
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

  const handleImageChange1 = (e) => {
    const file = e.target.files[0]
    // console.log(file);
    const storageRef = ref(storage, `rimberiossMen/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress1(progress);
      }, 
      (error) => {
        toast.error(error.message)
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProducts({...products, bol : downloadURL})
          toast.success("Image Uploaded Succesfully")
        });
      }
    );

  }
  const handleImageChange2 = (e) => {
    const file = e.target.files[0]
    // console.log(file);
    const storageRef = ref(storage, `rimberiossMen/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress2(progress);
      }, 
      (error) => {
        toast.error(error.message)
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProducts({...products, sun : downloadURL})
          toast.success("Image Uploaded Succesfully")
        });
      }
    );

  }

  
  const addProducts = (e) => {
    e.preventDefault();
    try {
      const docRef = addDoc(collection(db, "men-products"), {
        title: products.title,
        cat : products.cat,
        brand : products.brand,
        oldprice : Number(products.oldprice),
        price : Number(products.price),
        img : products.img,
        bol : products.bol,
        sun : products.sun,
        tags : products.tags,
        description : products.description,
        reviewdate : products.reviewdate,
        username : products.username,
        reviews : products.reviews,
        rate : products.rate,
        createdAt : Timestamp.now().toDate()
      });
      setUploadProgress(0)
      setUploadProgress1(0)
      setUploadProgress2(0)
      setProducts({...initailState})
      toast.success("Product Uploaded Sucessfully");
      navigate("/admin/all-men-products")
    } catch (error) {
      toast.error(error.message)
    }
  }
  
  const editProducts = (e) => {
    e.preventDefault();
    if(products.img !== productsEdit.img) {
      const storageRef = ref(storage, productsEdit.img);
      deleteObject(storageRef)
    }else if(products.bol !== productsEdit.bol) {
      const storageRef = ref(storage, productsEdit.bol);
      deleteObject(storageRef)
    }else if(products.sun !== productsEdit.sun) {
      const storageRef = ref(storage, productsEdit.sun);
      deleteObject(storageRef)
    }
    try {
      setDoc(doc(db, "men-products", id), {
        title: products.title,
        cat : products.cat,
        brand : products.brand,
        oldprice : Number(products.oldprice),
        price : Number(products.price),
        img : products.img,
        bol : products.bol,
        sun : products.sun,
        tags : products.tags,
        description : products.description,
        reviewdate : products.reviewdate,
        username : products.username,
        reviews : products.reviews,
        rate : products.rate,
        createdAt : productsEdit.createdAt,
        editedAt : Timestamp.now().toDate()
      });
      toast.success("Product Edited Succesfully");
      navigate("/admin/all-men-products")
    } catch (error) {
      toast.error(error.message);
    }
  }
  const categories = [
    {
      id : 1,
      name : "MenWears"
    },
  ]
  const tags = [
    {
      id : 1,
      name : "hats",
      subname : "menhats"
    },
    {
      id : 2,
      name : "t-shirts",
      subname : "mentshirts"
    },
    {
      id : 3,
      name : "coats",
      subname : "mencoats"
    },
    {
      id : 4,
      name : "hoodies",
      subname : "menhoodies"
    },
    {
      id : 5,
      name : "bags",
      subname : "menbags"
    },
    {
      id : 6,
      name : "shoes",
      subname : "menshoes"
    },
    {
      id : 7,
      name : "shirts",
      subname : "menshirts"
    },
    {
      id : 8,
      name : "belts",
      subname : "menbelts"
    },
    {
      id : 9,
      name : "jeans",
      subname : "menjeans"
    },
    {
      id : 10,
      name : "trousers",
      subname : "mentrousers"
    },
    {
      id : 11,
      name : "glasses",
      subname : "menglasses"
    },
    {
      id : 12,
      name : "watches",
      subname : "menwatches"
    },
  ]

  return (
    <div className='admin_productss'>
      <h1>{detectForm(id, "Add New Product", "Edit Product")}</h1>
      <div className="cards">
        <form onSubmit={detectForm(id, addProducts, editProducts)}>
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
            <label>Product Image1:</label>
            <div className="card_imge">
              {
                uploadProgress1 === 0 ? null : (
                  <div className="progress">
                    <div className="progress_bar" style={{width: `${uploadProgress1}%`}}>
                      {
                        uploadProgress1 < 100 ? `Uploading ${uploadProgress1}` : `Upload Completed ${uploadProgress1}%`
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
                  onChange={(e) => handleImageChange1(e)}
                />
                {
                  products.bol === "" ? null : (
                    <input 
                      type="text" 
                      name='bol'
                      value={products.bol}
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
            <label>Product Image2:</label>
            <div className="card_imge">
              {
                uploadProgress2 === 0 ? null : (
                  <div className="progress">
                    <div className="progress_bar" style={{width: `${uploadProgress2}%`}}>
                      {
                        uploadProgress2 < 100 ? `Uploading ${uploadProgress2}` : `Upload Completed ${uploadProgress2}%`
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
                  onChange={(e) => handleImageChange2(e)}
                />
                {
                  products.sun === "" ? null : (
                    <input 
                      type="text" 
                      name='sun'
                      value={products.sun}
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
              name='oldprice'
              value={products.oldprice}
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
          <div className="input_change">
            <label>Product Category :</label>
            <select 
              name="cat" 
              value={products.cat}
              onChange={(e) => handleInputChange(e)}
              required
            >
              <option value="" disabled>-- Choose Product Category --</option>
              {
                categories.map(cats => {
                  return(
                    <option key={cats.id} value={cats.name}>{cats.name}</option>
                  )
                })
              }
            </select>
          </div>
          <div className="input_change">
            <label>Product Brand :</label>
            <input 
              type="text" 
              placeholder='Product Brand'
              name='brand'
              value={products.brand}
              onChange={(e) => handleInputChange(e)}
              required  
            />
          </div>
          <div className="input_change">
            <label>Product Tags :</label>
            <select 
              name="tags" 
              value={products.tags}
              onChange={(e) => handleInputChange(e)}
              // required
            >
              <option value="" disabled>-- Choose Product Tags --</option>
              {
                tags.map(tag => {
                  return(
                    <option key={tag.id} value={tag.name}>{tag.subname}</option>
                  )
                })
              }
            </select>
          </div>
          <div className="input_change">
            <label>Product Descrition :</label>
            <textarea 
              name="description"
              value={products.description}
              onChange={(e) => handleInputChange(e)}
              required
            ></textarea>
          </div>
          <h4>Reviews For The Product</h4>
          <div className="input_change">
            <label>Product Review Date:</label>
            <input 
              type="text" 
              placeholder='Product Review Date'
              name='reviewdate'
              value={products.reviewdate}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="input_change">
            <label>Username Reviews:</label>
            <input 
              type="text" 
              placeholder='Username Reviews'
              name='username'
              value={products.username}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="input_change">
            <label>Reviews:</label>
            <input 
              type="text" 
              placeholder='Reviews'
              name='reviews'
              value={products.reviews}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="input_change">
            <label>Rate:</label>
            <input 
              type="number" 
              placeholder='Product Brand'
              name='rate'
              value={products.rate}
              onChange={(e) => handleInputChange(e)}
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
