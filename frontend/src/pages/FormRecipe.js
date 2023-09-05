import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRecipe, createRecipe , UpdateImage} from '../redux/actions/recipeActions';
import { getAllRecipes, deleteRecipe } from '../redux/actions/recipeActions';
import { useParams } from 'react-router-dom';
import CardListUsers from '../components/ReusableComponents/components/Cards/CardListUsers';
import CardLineChart from '../components/ReusableComponents/components/Cards/CardLineChart';
import CardBarChart from '../components/ReusableComponents/components/Cards/CardBarChart';
import CardSocialTraffic from '../components/ReusableComponents/components/Cards/CardSocialTraffic';
import CardPageVisits from '../components/ReusableComponents/components/Cards/CardPageVisits';
import HeaderStats from '../components/ReusableComponents/components/Headers/HeaderStats';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../components/ReusableComponents/components/Sidebar/Sidebar";
import { TagsInput } from "react-tag-input-component";

import NoAccess from "./NoAccess";

const FormRecipe = (props) => {
  const navigate = useNavigate();
    const { id } = useParams();
    const [image, setImage] = useState([
      "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg",
    ]);
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes.recipes);
  const [recipe, setRecipe] = useState({
    name: '',
    image: '',
    preparation: '',
    cooking: '',
    quantity: '',
    ingredients: '',
    material: '',
    rating: 0
  });


  useEffect(() => {
    if (id && recipes) {
      const currentRecipe = recipes.find(recipe => recipe._id === id);
      if (currentRecipe) {
        setRecipe(currentRecipe);
        setImage(currentRecipe?.image?.url);
      }
    }
  }, [id, recipes]);

  const showToastMessage = () => {
    toast.success('updated successfuly !'
    );
    console.log("toastr",showToastMessage);
};
  
   //handle and convert it in base 64
   const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    //console.log(file);
  };
  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  const handleSubmit = (event) => {
    event.preventDefault();
   {
      dispatch(updateRecipe(recipe._id, recipe),UpdateImage(recipe._id, image)).then(() => {
        dispatch(getAllRecipes());
        showToastMessage()
        setTimeout(() => {
          navigate('/admin');
        }, 3000); 

      });

    }   
  };
  if (props.user.isConnected && props.user.role == "ADMIN") {
  } else {
    return <NoAccess />;
  }
  

  return (
    
    <div>
      
      <Sidebar />
        <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
          </div>

        <section className="pb-16 bg-blueGray-200 relative pt-32">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
         
           
        </div>

        <div className="container mx-auto" >
          <div className="flex flex-wrap  bg-white shadow-xl rounded-lg -mt-64 py-16 px-12 relative z-10 mx-auto max-w-2xl text-center" style={{flexDirection:"column"}}>
          <div className="flex flex-wrap  bg-white shadow-xl rounded-lg -mt-64 py-16 px-12 relative z-10" style={{ marginTop :"0%" }}>

          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Update Recipe</h2>
      
      <form onSubmit={handleSubmit} className='mx-auto mt-16 max-w-xl sm:mt-20'>
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <div className="sm:col-span-2">
        
        <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
          Name:
          </label>
          <div className="mt-2.5">
          <input  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" value={recipe.name} onChange={(e) => setRecipe({ ...recipe, name: e.target.value })} name="name" required />
          </div>
        </div>
        <br />
        <div className="mb-4">
                    <label
                      style={{ marginLeft: "-15rem" }}
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Picture:
                    </label>
                  </div>

                  <div className="sm:col-span-2 mx-auto flex items-center">
                    <div className="w-full flex items-center justify-center ">
                      <div className="d-flex " >
                        <div className="btn btn-primary btn-rounded ">
                          <label
                            className="form-label text-white m-1"
                            htmlFor="customFile1"
                          >
                            Choose file
                          </label>
                          <input
                          
                            type="file"
                            className="block text-sm font-semibold bg-grey-600 leading-6 text-white "
                            id="customFile1"
                            onChange={handleImage}
                          />
                        </div>
                      </div>

                      <div className="ml-4 mb-4">
                        <img
                          src={image}
                          alt="example placeholder"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)"
                          }}
                        />
                      </div>
                    </div>
                  </div>
        <br />
        
        <div className="sm:col-span-2">
        <label className="block text-sm font-semibold leading-6 text-gray-900">
          Preparation:
          <textarea  style={{width:"30rem"}}  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={recipe.preparation} onChange={(e) => setRecipe({ ...recipe, preparation: e.target.value })} required />
        </label >
</div>
        <br />
        <div className="sm:col-span-2">
        <label className="block text-sm font-semibold leading-6 text-gray-900">
          Cooking:
          <textarea style={{width:"30rem"}}  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
           value={recipe.cooking} onChange={(e) => setRecipe({ ...recipe, cooking: e.target.value })} required />
        </label>
        </div>
        <br />
        <div className="sm:col-span-2">
        <label className="block text-sm font-semibold leading-6 text-gray-900">
          Quantity:
          <input  style={{width:"30rem"}}  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" value={recipe.quantity} onChange={(e) => setRecipe({ ...recipe, quantity: e.target.value })} />
        </label>
        </div>
        <br />
        <div className="sm:col-span-2">
        <label className="block text-sm font-semibold leading-6 text-gray-900">
          ingredients:
          <textarea  style={{width:"30rem"}}  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={recipe.ingredients} onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value })} required />
        </label>
        </div>
        <br />
        <div className="sm:col-span-2">
        <label className="block text-sm font-semibold leading-6 text-gray-900">
        Preparation:
          <textarea  style={{width:"30rem"}}  
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={recipe.material} onChange={(e) => setRecipe({ ...recipe, material: e.target.value })} required />
        </label>
        </div>
        <br />
        {/* <div className="sm:col-span-2">
        <label className="block text-sm font-semibold leading-6 text-gray-900">
          Rating:
          <input  style={{width:"30rem"}}  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="number" min="0" max="5" value={recipe.rating}
            onChange={(e) => setRecipe({ ...recipe, rating: e.target.value })}  />
        </label>
        </div> */}
        <br />
       
        </div>
        <div className="mt-10">
<button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >Update</button>
<ToastContainer />
</div>
</form>
          </div>
        </div>
        </div>
      </section> 
</div>
  

);
};

export default FormRecipe
