import "./App.css";
import Associationpage from "./pages/Associationpage";
import Particularpage from "./pages/Particularpage";
import Proffpage from "./pages/Proffpage";
// Dashboard imports
import CardListRatings from "./components/ReusableComponents/components/Cards/CardListRatings";
import CardListReports from "./components/ReusableComponents/components/Cards/CardListReports";
import TrashSpotHome from "./pages/TrashSpot/TrashSpotHome";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";

import SupportCenter from "./pages/SupportCenter";
import SideButton from "./pages/sideButton";
import Stat from "./components/ReusableComponents/components/Cards/Stat";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterPartner from "./pages/RegisterPartner";
import Admin from "./pages/Dashboard";
import PrivateRouter from "./components/PrivateRouter";
import store from "./redux/store";
import jwt_decode from "jwt-decode";
import NotFound from "./pages/NotFound";
import NoAccess from "./pages/NoAccess";
import AdminRouter from "./components/AdminRouter";
import ForceRedirect from "./components/ForceRedirect";
import { setUser } from "./redux/actions/authActions";
import { useSelector } from "react-redux";
import VerifSend from "./pages/VerifSend";
import VerifSuccess from "./pages/VerifSuccess";
import VerifFail from "./pages/VerifFail";
import CheckVerif from "./pages/CheckVerif";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Dashboard imports
import Sidebar from "./components/ReusableComponents/components/Sidebar/Sidebar";
import AdminNavbar from "./components/ReusableComponents/components/Navbars/AdminNavbar";
import HeaderStats from "./components/ReusableComponents/components/Headers/HeaderStats";
import FooterAdmin from "./components/ReusableComponents/components/Footers/FooterAdmin";
import { setAuth } from "./util/setAuth";
import { Logout } from "./redux/actions/authActions";
import Profile from "./pages/Profile";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import RecipeList from "./pages/RecipesList";
import RecipesList from "./pages/RecipesList";
import Recipes from "./pages/Recipes";
import FormRecipe from "./pages/FormRecipe";
import AddRecipe from "./pages/AddRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import FormParticulier from "./pages/FormParticulier";
import FormProfessional from "./pages/FormProfessional";
import FormAssociation from "./pages/FormAssociation";
import FormLivreur from "./pages/FormLivreur";
import FormTrash from "./pages/FormTrash";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LoggedFBG from "./pages/LoggedFBG";
import { useEffect, useState } from "react";

//product
import FormProduct from "./pages/product/FormProduct";
import ProductsCreated from "./pages/product/ProductsCreated";
import FormUpdateProduct from "./pages/product/FormUpdateProduct";
import AllProducts from "./pages/product/AllProducts";
import Gallery from "./pages/product/Gallery";
import Popup from "./pages/product/Popup";
import Favoris from "./pages/product/Favoris";
import ProductSlideShowAndDetails from "./pages/product/ProductSlideShowAndDetails";
import Test from "./pages/product/Test";
import BasketPage from "./pages/Basket/BasketPage";
import Checkout from "./pages/Basket/Checkout";
import Completion from "./pages/Basket/Completion";

import GetPosition from "./pages/GetMyPosition/GetPosition";
import ProfessionalPage from "./pages/ProfessionalPage";
import ProfPage from "./pages/ProfPage";

if (window.localStorage.jwt) {
  const decode = jwt_decode(window.localStorage.jwt);
  store.dispatch(setUser(decode));
  setAuth(window.localStorage.jwt);
  const currentDate = Date.now / 1000;

  if (decode.exp > currentDate) {
    store.dispatch(Logout());
  }
}

function App() {
  const auth = useSelector((state) => state.auth);
  const user = {
    isConnected: auth.isConnected,
    role: auth.user.role,
  };
  const [user1, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("https://he-bosses-pi-dev-api.onrender.com/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          console.log("hedha res", resObject.user);
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log("fama erreur", err);
        });
    };
    getUser();
  }, []);
  console.log(user1);
  return (
    <BrowserRouter>
      <div className="bg-light" style={{ height: "fit-content" }}>
        {" "}
        {/* kent style={{ height: '100vh' }} */}
        <Routes>
          <Route
            path="/"
            element={<PrivateRouter user1={user1} user={user}></PrivateRouter>}
          />
          <Route
            path="/professionalPage"
            element={
              <ProfessionalPage user1={user1} user={user}></ProfessionalPage>
            }
          />
          <Route
            path="/profPage"
            element={
              <ProfPage user1={user1} user={user}></ProfPage>
            }
          />

          <Route path="/getpos" element={<GetPosition></GetPosition>} />

          {/* <Route
            path="/profile"
            element={<PrivateRouter user={user}></PrivateRouter>}
          />

          <Route
            path="/particpage"
            element={<PrivateRouter user={user}></PrivateRouter>}
          />
          <Route
            path="/associpage"
            element={<PrivateRouter user={user}></PrivateRouter>}
          />
          <Route
            path="/proffpage"
            element={<PrivateRouter user={user}></PrivateRouter>}
          /> */}
          {/* <Route path="/"> */}
          {/* <Route path="/proffpage" element={<Proffpage />} />
            <Route path="/particpage" element={<Particularpage />} />
            <Route path="/associpage" element={<Associationpage />} />
            <Route path="/profile" element={<Profile />} /> */}
          {/* </Route> */}

          <Route
            path="/admin/profile/:id"
            element={
              <AdminRouter user={user}>
                <Profile user={user} />
              </AdminRouter>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRouter user={user}>
                <Sidebar />
                <div className="relative md:ml-64 bg-blueGray-100">
                  <AdminNavbar />
                  {/* Header */}
                  <HeaderStats />
                  <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <Admin />
                    <FooterAdmin />
                  </div>
                </div>
              </AdminRouter>
            }
          />
          <Route
            path="/admin/listOfRatings"
            element={
              <>
                <AdminRouter user={user}>
                  <Sidebar />
                  <div className="relative md:ml-64 bg-blueGray-100">
                    {/* Header */}
                    <HeaderStats />
                    <div className="flex flex-wrap mt-4">
                      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                        <CardListRatings />
                      </div>
                      <div className="w-full xl:w-4/12 px-4">
                        <Stat />
                      </div>
                    </div>

                    <FooterAdmin />
                  </div>
                </AdminRouter>
              </>
            }
          />

          <Route
            path="/admin/listOfReports"
            element={
              <>
                <AdminRouter user={user}>
                  <Sidebar />
                  <div className="relative md:ml-64 bg-blueGray-100">
                    {/* Header */}
                    <HeaderStats />
                    <div className="px-4 md:px-10 mx-auto w-full -m-24">
                      <CardListReports />
                      <FooterAdmin />
                    </div>
                  </div>
                </AdminRouter>
              </>
            }
          />
          <Route
            path="/login"
            element={
              <ForceRedirect user={user}>
                <Login />
              </ForceRedirect>
            }
          />
          <Route
            path="/register"
            element={
              <ForceRedirect user={user}>
                <Register />
              </ForceRedirect>
            }
          />
          <Route
            path="/registerPartner"
            element={
              <PrivateRouter user={user} user1={user1}>
                <RegisterPartner />
              </PrivateRouter>
            }
          />

          <Route
            path="/verification"
            element={
              // <ForceRedirect user={user}>
              <VerifSend />
              // </ForceRedirect>
            }
          />
          <Route
            path="/verify"
            element={
              // <ForceRedirect user={user}>
              <CheckVerif />
              // </ForceRedirect>
            }
          />
          <Route
            path="/verified"
            element={
              // <ForceRedirect user={user}>
              <VerifSuccess />
              // </ForceRedirect>
            }
          />
          <Route
            path="/notVerified"
            element={
              // <ForceRedirect user={user}>
              <VerifFail />
              // </ForceRedirect>
            }
          />
          <Route
            path="/logged"
            element={
              // <ForceRedirect user={user}>
              <LoggedFBG user1={user1} />
              // </ForceRedirect>
            }
          />

          <Route
            path="/forgotPassword"
            element={
              <ForceRedirect user={user}>
                <ForgotPassword />
              </ForceRedirect>
            }
          />

          <Route
            path="/resetPassword/:token"
            element={
              <ForceRedirect user={user}>
                <ResetPassword />
              </ForceRedirect>
            }
          />
          <Route
            path="/formPart/:id"
            element={<FormParticulier user={user} />}
          />
          <Route
            path="/formProf/:id"
            element={<FormProfessional user={user} />}
          />
          <Route
            path="/formAssoc/:id"
            element={<FormAssociation user={user} />}
          />
          <Route path="/support" element={<SupportCenter user1={user1} />} />

          <Route
            path="/formLivreur/:id"
            element={<FormLivreur user={user} />}
          />

          <Route
            path="/TrashSpot"
            element={
              // <ForceRedirect user={user}>
              <TrashSpotHome user1={user1} user={user} />
              // </ForceRedirect>
            }
          />

          <Route path="/formTrash/:id" element={<FormTrash user={user} />} />
          {/* <Route path="/profile" element={<Profile user={user} />} />*/}
          <Route path="/admin/profiles/" element={<Profile user={user} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/accesDenied" element={<NoAccess />} />
          <Route
            path="/rate"
            element={<SideButton user1={user1} user={user} />}
          />
          <Route path="/formTrash/:id" element={<FormTrash user={user} />} />
          {/* <Route path="/profile" element={<Profile user={user} />} />*/}
          <Route path="/admin/profiles/" element={<Profile user={user} />} />

          <Route path="/addProduct" element={<FormProduct />} />
          <Route
            path="/productsCreated"
            user1={user1}
            element={<ProductsCreated />}
          />
          <Route path="/updateProduct/:id" element={<FormUpdateProduct />} />
          <Route path="/allProducts" element={<AllProducts />} />
          <Route path="/favoris" element={<Favoris />} />
          <Route
            path="/slideShow/:id"
            element={<ProductSlideShowAndDetails />}
          />
          <Route path="/test" element={<Test />} />

          <Route path="/recipes" element={<Recipes user={user} />} />
          <Route path="/recipes/add" element={<AddRecipe user={user} />} />

          <Route
            path="/recipes/recipesList"
            element={<RecipeList user={user} />}
          />
          <Route
            path="/recipes/edit/:id"
            element={<FormRecipe user={user} />}
          />
          <Route path="/recipes/:id" element={<RecipeDetails user={user} />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/completion" element={<Completion />} />

          <Route path="*" element={<NotFound />} />
          <Route path="/accesDenied" element={<NoAccess />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
