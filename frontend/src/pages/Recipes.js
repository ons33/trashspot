/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import patternReact from "../assets/img/recipelandinggg.png";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRecipes, deleteRecipe } from "../redux/actions/recipeActions";
import Navbar from "../components/ReusableComponents/components/Navbars/UserNavbar";
import allrecipes from "../assets/img/recipes.png";
import doc from "../assets/img/doc.png";
import docc from "../assets/img/ii.jpg";
// import Footer from './components/ReusableComponents/components/Footers/FooterAdmin';
import Footer from '../components/ReusableComponents/components/Footers/FooterAdmin';
import {makeStyles} from '@material-ui/core/styles';
import { StarIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import '../assets/styles/Recipes.css'
import NoAccess from "./NoAccess";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    height:"200px"
  },

  cardd: {
    width: 340,
    height: 300,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: '1rem',
    border: 'solid #f59e0b 1px',
  },

  'cardd img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.2s ease-in-out',
  },

  'cardd:hover img': {
    transform: 'translateY(-10px)',
  },

  'cardd::before': {
    content: '',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '40%',
    background: 'linear-gradient(transparent, #6c757d)',
  },

  'cardd-content': {
    position: 'absolute',
    bottom: '1rem',
    left: '1rem',
    color: 'white',
    width: 'calc(100% - 2rem)',
    display: 'flex',
    flexDirection: 'column',
  },

  'cardd-content h4': {
    marginBottom: '0.5rem',
  },

  'cardd-content .rating': {
    display: 'flex',
    alignItems: 'center',
  },

  'cardd-content .rating svg': {
    height: '1.2rem',
    width: '1.2rem',
    flexShrink: 0,
    fill: '#f59e0b',
    marginRight: '0.25rem',
  },
}));

export default function Recipes(props) {
  const recipes = useSelector((state) => state.recipes.recipes);
  const dispatch = useDispatch();
  
  const [isCardActive, setIsCardActive] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    dispatch(getAllRecipes());
    console.log("all", recipes);
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      dispatch(deleteRecipe(id)).then(() => {
        dispatch(getAllRecipes());
      });
    }
  };
  if (!recipes || !Array.isArray(recipes)) {
    return <div>Loading...</div>;
  }
  // sort the recipes array in descending order based on rating
  

  function getAverageRating(ratings) {
    if (ratings.length === 0) {
      return 0;
    }

    const sum = ratings.reduce((acc, cur) => acc + cur, 0);
    return (sum / ratings.length).toFixed(1);
  }
  console.log("-->"+recipes.map(test=>console.log(test.ratingszzzzzzzzzzzzzz)))
  console.log("**"+getAverageRating(recipes.map(test=>{return(test.ratings)})))

  const sortedRecipes =  recipes.sort((a, b) => b.ratings - a.ratings);

  // // get only the top 4 rated recipes
  const topRecipes = sortedRecipes.slice(0, 4);
  console.log("topRecipes", topRecipes);







  if (props.user.isConnected && props.user.role == "PARTICULAR") {
  } else {
    return <NoAccess />;
  }
  
  return (
    <>
      <Navbar user1={props.user1} />
      <section
        className="header relative pt-16 items-center flex h-screen max-h-860-px"
        style={{
          backgroundImage: `url(${patternReact})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
          marginTop:"1%"
        }}
      >
                {/* <div className={[classes.container ,"mx-auto items-center flex flex-wrap"]}  > */}

        <div className="containerrr mx-auto items-center flex flex-wrap ">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <div
                className=""
                style={{ backgroundImage: `url(${patternReact})` }}
              ></div>
            </div>
          </div>
        </div>

        <Link to={"/recipes/recipesList"}>
          {" "}
          <Button
            style={{
              marginLeft: "-540%",
              marginTop:"10%",
              width: "200px",
              backgroundColor: "#3a9a61",
              border: "#3a9a61",
            }}
          >
            Discover All Recipes{" "}
          </Button>
        </Link>
      </section>

      <section
        className="mt-48 md:mt-40 pb-40 relative "
        style={{
          marginTop: "-10rem",
          backgroundImage: `url(${allrecipes})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {topRecipes.map((recipe, index) => (
            <div key={index} style={{ flexBasis: "10%", marginBottom: "1rem",  padding:"1rem"}}>
                              {/* <div className={[classes.container ,"mx-auto items-center flex flex-wrap"]}  > */}

              <div
                   className="containerrr mx-auto shadow-lg rounded-lg cardd "
                   
                style={{
                  height: "300px",
                  width: "340px",
                  position: "relative",
                  overflow: "hidden",
                  marginTop: "150px",
                  border: "#6c757d"
                 
                }}
             
              >
                <img
                  alt="tsawer"
                  src={recipe.image.url}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "40%",
                    background:
                      "linear-gradient(transparent, #6c757d)",
                    color: "#24b765",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                className="cardd-content"
                >
                  <h4 style={{ marginBottom: "0.5rem" ,fontSize: "1.5rem" }}>
                    <Link
                      to={`/recipes/${recipe._id}`}
                      style={{ color: "#fff" , fontFamily: "Arial", fontSize: "18px",textDecoration: "none"}}
                    >
                      {recipe.name}
                    </Link>
                  </h4>
                  {/* <p style={{ marginBottom: "0.5rem" }}>{recipe.preparation}</p> */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <h2 className="sr-only">Product rating</h2>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={classNames(
                            "h-5 w-5 flex-shrink-0",
                            getAverageRating(recipe.ratings) > i
                              ? "filled text-yellow-400"
                              : "text-gray-100"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section
          style={{
            backgroundImage: `url(${doc})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            marginTop: "-19%",
          }}
        >
          <div className="containerrr mx-auto px-4 pb-32 pt-48">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-5/12 ml-auto px-12 md:px-4">
                <div className="md:pr-12" style={{ marginTop: "40%" }}>
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i class="fas fa-exclamation-triangle text-xl text-yellow-500"></i>                  </div>
                  <h3 className="text-3xl font-semibold text-white">
                    Food waste in Tunisia
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-white">
                    According to official figures dating back to 2020, nearly
                    572 million dinars worth of food products are wasted each
                    year by Tunisian households.
                  </p>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                        </div>
                        <div>
                          <h4 className="mt-4 text-lg leading-relaxed text-white">
                            You , me and everyone who wants it, we are capable of
                            reducing this number!
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="w-full md:w-6/12 mr-auto px-4 pt-24 md:pt-0">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-xl"
                  style={{
                    marginTop:"210px",
                    marginLeft:"40px",
                    transform:
                      "scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)",
                  }}
                  src={docc}
                />
              </div>
            </div>
          </div>

       

        </section>
        
      </section>
     
    </>
  );
}
