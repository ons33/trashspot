import Navbar from "../components/ReusableComponents/components/Navbars/UserNavbar";
import {
  getAllRecipes,
  deleteRecipe,
 
} from "../redux/actions/recipeActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import patternReact from "../assets/img/recipelandinggg.png";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { StarIcon } from "@heroicons/react/20/solid";
import NoAccess from "./NoAccess";
import axios from 'axios';
import rec from "../assets/img/rec.png";
import { generateTestData, usePagination, Pagination } from "pagination-react-js"
import "./recipiesList.css";
import classNames from "classnames";

export default function RecipeList(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  const [filteredRecipes, setfilteredRecipes] = useState([]);

  const recipes = useSelector((state) => state.recipes.recipes);


  const { currentPage, entriesPerPage, entries } = usePagination(1, 8)


useEffect(()=>{
if (recipes){
  setfilteredRecipes(recipes)
}
},[recipes])
 useEffect(() => {
    dispatch(getAllRecipes())
      .then(() => {setLoading(false)})
      .catch((error) => console.log(error));
  }, [dispatch]);
  const recipe = useSelector((state) => state.recipes.selectedRecipe);

  function getAverageRating(ratings) {
    if (ratings.length === 0) {
      return 0;
    }
    const sum = ratings.reduce((acc, cur) => acc + cur, 0);
    return (sum / ratings.length).toFixed(1);
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      dispatch(deleteRecipe(id)).then(() => {
        dispatch(getAllRecipes());
      });
    }
  };
  const getRecipesByIngredient = async (ingredient) => {
    try {
      
      const res = await axios.get(`/recipe/${ingredient}`)
      
      .then((data) => {return data.data.data })
     return res
    } catch (error) {
      console.log(error);
    }
  };

  //  setfilteredRecipes (
  //   searchQuery !== ""
      
    useEffect(()=>{
     if(searchQuery.length === 0)
        setfilteredRecipes(recipes)
 
    },[searchQuery])


      
      const handleSearch = async (e) => {
        e.preventDefault();
        if(searchQuery.length !==0){
          setfilteredRecipes(     await getRecipesByIngredient(searchQuery)        )

        }else{
          //setfilteredRecipes(recipes)
        }
      }; 




      
  if (!recipes) {
    return <div>Loading...</div>;
  }
  if (props.user.isConnected && props.user.role == "PARTICULAR") {
  } else {
    return <NoAccess />;
  }
  return (
    <div className="bg-white">
   <Navbar/>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2
          className="text-2xl font-bold tracking-tight text-gray-900 text-center"
          style={{ paddingBottom: "50px" }}
        >
          Anti-waste recipes
        </h2>
        <form onSubmit={handleSearch}>
          <label
            htmlFor="searchInput"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search by ingredient:
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              style={{ height: "9px", marginBottom: "50px" }}
              type="text"
              id="searchInput"
              class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-green-600 dark:placeholder-green-400 green:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="tap ingrediens to search for recipes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
          </div>
        </form>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredRecipes?.length === 0 ? (
            <p>No recipes found with "{searchQuery}"</p>
          ) : (
            filteredRecipes?.slice(entries.indexOfFirst, entries.indexOfLast).map((recipe) => 
                                    <div className=" px-12 md:px-4 mr-auto ml-auto -mt-32"   style={{ marginTop: "10px", width: "300px" }}>
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg " key={recipe._id}  >

                <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 " >
                  <img
                    src={
                      recipe?.image?.url
                        ? recipe?.image?.url
                        : "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"
                    }
                    alt={recipe.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <blockquote className="relative p-8 mb-4" style={{height:"140px" }}>
                <svg
                            preserveAspectRatio="none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 583 95"
                            className="absolute left-0 w-full block h-95-px -top-94-px"
                          >
                            <polygon
                              points="-30,95 583,95 583,65"
                              className=" fill-current"
                              style={{ color: "#24b765" }}
                            ></polygon>
                          </svg>
                          <section className="recipe-details">
  <div className="recipe-header">
    <h1 className="text-2xl font-bold tracking-tight mb-2 " style={{marginTop:"-20px", color:"#374151", fontFamily: "auto" , fontSize:"30px"}}>                       
     <Link style={{color:"#374151",textDecoration: "none"}} to={`/recipes/${recipe._id}`}>{recipe.name}</Link>
</h1>
    <div className="flex items-center" style={{justifyContent: "space-around"}}>
   
      <div className="recipe-rating flex items-center" >
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={classNames(
              "h-4 w-4 flex-shrink-0",
              getAverageRating(recipe.ratings) > i
                ? "filled text-yellow-500"
                : "text-gray-300"
            )}
            aria-hidden="true"
          />
        ))}
      </div>
      
    </div>
  </div>
  <div className="recipe-content mt-4 flex flex-col md:flex-row">
    
    <div className="recipe-info flex-1">
      <div className="recipe-preparation mb-4">
        <h6 className=" font-bold mb-2" style={{fontSize:"12px",marginTop:"-10px",color:"#374151"}}>Preparation:   {recipe.preparation}</h6>
     
      </div>
      <div className="recipe-cooking mb-4">
        <h6 className="text-lg font-bold mb-2" style={{fontSize:"12px",marginTop:"-10px",color:"#374151"}}>Cooking:  {recipe.cooking}</h6>
       
      </div>
    </div>
  </div>
  <div className="recipe-actions mt-4">
    {/* Uncomment the following line if you want to add a delete button */}
    {/* <Button variant="outline-danger" size="sm" onClick={() => handleDelete(recipe._id)}>Delete</Button> */}
  </div>
</section>


                </blockquote>
                
              </div>
               </div>
            )
          )}
        </div>
        <Pagination
  entriesPerPage={entriesPerPage.get}
  totalEntries={filteredRecipes?.length}
  currentPage={{ get: currentPage.get, set: currentPage.set }}
  offset={3}
  className="pagi"
  classNames={{

    wrapper: "pagination m-auto",
    item: "pagination-item",
    itemActive: "pagination-item-active",
    navPrev: "pagination-item nav-item",
    navNext: "pagination-item nav-item",
    navStart: "pagination-item nav-item",
    navEnd: "pagination-item nav-item",
    navPrevCustom: "pagination-item",
    navNextCustom: "pagination-item"
  }}
  showFirstNumberAlways={true}
  showLastNumberAlways={true}
  navStart="&#171;"
  navEnd="&#187;"
  navPrev="&#x2039;"
  navNext="&#x203a;"
  navPrevCustom={{ steps: 5, content: "\u00B7\u00B7\u00B7" }}
  navNextCustom={{ steps: 5, content: "\u00B7\u00B7\u00B7" }}
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px 0'
  }}
/>
      </div>
      <section className="pb-20 relative block bg-blueGray-800">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-800 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
             
              </svg>
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4" style={{marginTop:"5%", width:"40%" , marginLeft:"-10%"}}>
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-xl"
                  style={{
                    transform:
                      "scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)",
                  }}                  // src="https://img.freepik.com/premium-vector/people-recycling-with-trash-bin_23-2148524155.jpg"
                  src={rec}
                />
              </div>

              <div className="w-full md:w-5/12 ml-auto mr-auto px-4" style={{}}>
                <div className="md:pr-12">
                  <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
                    <i className="fas fa-rocket text-xl"></i>
                  </div>
                  <h3 className="text-3xl font-semibold text-white">ZeroWaste Recipes</h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  Our web application is focused on reducing food waste by providing users with antiwaste and zero waste recipes. We prioritize using every part of an ingredient to reduce waste and promote sustainable practices such as using reusable containers and buying ingredients in bulk                  

                  </p>
                  <ul className="list-none mt-6">
                 
                  
                  
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}
