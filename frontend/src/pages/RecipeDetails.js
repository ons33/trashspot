import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById, rateRecipe } from "../redux/actions/recipeActions";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import Navbar from "../components/ReusableComponents/components/Navbars/UserNavbar";
import NoAccess from "./NoAccess";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const RecipeDetails = (props) => {
    const [hover, setHover] = useState(false);

  const [rating, setRating] = useState(null);
  const dispatch = useDispatch();
  const [averageRating, setAverageRating] = useState(null);
  const rateRecipeState = useSelector((state) => state.rateRecipe);
  const [hoverValue, setHoverValue] = useState(undefined);

  const handleRatingChange = (event) => {
    const value = parseInt(event.target.value);
    setRating(value);
  };
 const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    stars: {
      display: "flex",
      flexDirection: "row",
    },
    textarea: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      padding: 10,
      margin: "20px 0",
      minHeight: 100,
      width: 300,
      color: "black",
    },
    button: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      width: 300,
      padding: 10,
    },
    icon: {
      position: "fixed",
      right: 20,
      bottom: 20,
      width: 50,
      height: 50,
      borderRadius: "50%",
      color: "#24b765",
      fontSize: 50,
      fontWeight: "bold",
      cursor: "pointer",
      transition: "transform 0.2s ease-in-out",
      transform: hover ? "rotate(90deg)" : "rotate(0deg)",
    },
  };
   const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };
    const [star, setstar] = useState(0);
    const showToastMessage = () => {
      toast.success('thanks for rating !'
      );
      console.log("toastr",showToastMessage);
  };
  
  const { id } = useParams();
  const stars = Array(5).fill(0);
  console.log("*=" + star);
  const handleClick = (value) => {
    setstar(value);
    console.log("nejmaaaaaaaaaaaaaaaaaaaa:  " + star);
    dispatch(rateRecipe(id, value));
    showToastMessage()
    setTimeout(() => {
    }, 3000); 
    
  };
  const handleHover = () => {
    setHover(!hover);
  };
  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  useEffect(() => {
    dispatch(getRecipeById(id));
  }, [id]);

  const recipe = useSelector((state) => state.recipes.selectedRecipe);
  useEffect(() => {
    if (recipe) {
      const ratings = recipe.ratings || [];
      const totalRatings = ratings.length;
      if (totalRatings > 0) {
        const sumRatings = ratings.reduce((total, rating) => total + rating, 0);
        const avgRating = sumRatings / totalRatings;
        setAverageRating(avgRating);
      } else {
        setAverageRating(0);
      }
    }
  }, [recipe]);
  const containerStyle = {
    marginLeft: "-10%" // You can adjust this value to move the page more to the right
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!rating || rating < 1 || rating > 5) {
      console.log("Invalid rating value");
      return;
    }
    dispatch(rateRecipe(id, star));
    setstar(null);
  };
 
  if (!recipe) {
    return <div>Loading...</div>;
  }
  if (props.user.isConnected && props.user.role == "PARTICULAR") {
  } else {
    return <NoAccess />;
  }

  return (
    <div >
      {recipe && (
        <>
          <Navbar />
          <div className="bg-white" style={containerStyle}>
            <div className="pt-6">
              <div
className="max-w-2xl mx-auto mt-6 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8"                style={{ height: "320px" }}
              >
                <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                  <img
                    style={{ height: "330px" }}
                    src={recipe.image.url}
                    alt={recipe.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                  <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                    <img
                      style={{ height: "150px" }}
                      src={recipe.image.url}
                      alt={recipe.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                    <img
                      style={{ height: "150px" }}
                      src={recipe.image.url}
                      alt={recipe.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
                <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                  <img
                    style={{ height: "320px" }}
                    src={recipe.image.url}
                    alt={recipe.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Product info */}
              <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <h1
                    className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
                    style={{ fontSize: "80px", fontFamily: "auto" }}
                  >
                    {recipe.name}
                  </h1>
                </div>

                {/* Options */}
                <div className="mt-4 lg:row-span-3 lg:mt-0">
                  <h2 className="sr-only">recipe information</h2>
                  <h1 className="text-3xl tracking-tight text-gray-900">
                 <h5>Preparation: </h5>  {recipe.preparation}
                

                  </h1>

                  {/* Reviews */}
                  <div className="mt-6">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                      <div className="mt-4">
                    <h2 className="sr-only">Product rating</h2>
                    <div className="flex items-center">
                      <div className="flex items-center mt-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={classNames(
                                averageRating > i
                                  ? "text-gray-900"
                                  : "text-gray-200",
                                "h-8 w-8 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p style={{marginTop:"10%"}} className="ml-3 text-m text-gray-700">
                          {averageRating?.toFixed(1) || "No ratings yet"}
                        </p>
                      </div>
                      <p style={{marginTop:"15%"}} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        {recipe.ratings.length} reviews
                      </p>
                    </div>
                  </div>
                        {/* {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))} */}
                      </div>
                      <p  className="sr-only">{recipe.rating} out of 5 stars</p>
                    </div>
                    <div>
                      <form onSubmit={handleSubmit} style={{marginTop:"20%"}}>
                        <label htmlFor="rating" style={{fontSize:"150%"}}>Rate this recipe:</label>
                         <div style={styles.stars}>
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    size={70}

                    onClick={() => handleClick(index + 1)}
                    onMouseOver={() => handleMouseOver(index + 1)}
                    onMouseLeave={handleMouseLeave}
                    color={
                      (hoverValue || star) > index ? colors.orange : colors.grey
                    }
                    style={{
                      marginRight: 10,
                      cursor: "pointer",
                    }}
                  />
                );
              })}
            </div>
                     
      
                    
                      </form>
                    </div>
                  </div>
                  {/* Product rating */}
               

                 
                </div>

                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                  {/* Description and details */}
                  <div>
                    <h3 className="sr-only">Description</h3>

                    <div className="mt-6">
  <div className="bg-gray-100 rounded-lg p-4">
    <h3 className="text-lg font-medium text-gray-900">
      Quantity: {recipe.quantity}
    </h3>
    <div className="flex items-center mt-2">
      <h3 className="text-lg font-medium text-gray-900">
        Ingredients:&nbsp;
      </h3>
      <ul className="ml-2">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-blue-100 bg-blue-700 rounded">
              {ingredient.trim()}
            </span>
          </li>
        ))}
      </ul>
    </div>
    <div className="flex items-center mt-2">
    <h3 className="text-lg font-medium text-gray-900">
      Cooking: {recipe.cooking}
    </h3>
    </div>
  </div>
</div>

                  </div>

               

                  <div className="mt-10">
                  
                    <div className="mt-4 space-y-6">
                    Directions:
                      <h2 className="text-sm text-gray-600">{recipe.material}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <ToastContainer />

    </div>
  );
};

export default RecipeDetails;
