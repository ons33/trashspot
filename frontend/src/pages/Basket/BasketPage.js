import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBasket, updateBasket } from '../../redux/actions/basketActions';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {
  fetchAllProducts,
  fetch_Products,
} from '../../redux/actions/productActions';
import Navbar from '../../components/ReusableComponents/components/Navbars/UserNavbar';
import Footer from '../../components/ReusableComponents/components/Footers/UserFooter';
function BasketPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  let userId = useSelector((state) => state.auth.user.id);

  const [isOpen, setIsOpen] = useState(false);

  async function getExistingBasket() {
    await dispatch(getBasket(userId));
  }

  async function getProducts() {
    await dispatch(fetchAllProducts());
  }

  useEffect(() => {
    getExistingBasket().then((r) => console.log('basket got from redux ', r));
    getProducts().then((r) => console.log('products in basketPage ', r));
  }, []);

  const basket = useSelector((state) => state.basket);
  const isLoading = useSelector((state) => state.basket.loading);
  const error = useSelector((state) => state.basket.error);
  const basketItems = useSelector((state) => state.basket.basketItems);
  const productsList = useSelector((state) => state.productList);
  const handleBasketDialog = () => {
    setIsOpen(!isOpen);
  };

  // Load images
  let filtered_list = [];
  console.log('prodddd ', productsList);
  if (basketItems.length !== 0 && productsList.products !== 0) {
    console.log('bask bask', productsList?.products);
    console.log('bass bass', basketItems);

    basketItems.forEach((element) => {
      let list = productsList.products.filter(
        (item) => item._id === element.productId._id
      );
      filtered_list.push(list[0]);
    });

    console.log('prod prod', filtered_list);
  }
  // end Load images

  function handleBackToProductsList() {
    navigate('/allProducts');
  }

  function handleProceedToCheckout() {
    navigate('/checkout');
  }

  async function onIncreaseQuantity(index) {
    let basketLocal = {};
    // Get specific product from list of products

    let productIndex = productsList.products.findIndex((product) => {
      return product._id === basketItems[index].productId._id;
    });

    // Compare basket quantity to Product stock
    if (
      productsList.products[productIndex].quantity >=
      basketItems[index].quantity + 1
    ) {
      basketItems[index].quantity++;
      basket.basket.products = basketItems;
      basketLocal = basket.basket;
      await dispatch(updateBasket(basketLocal));
    }
  }

  async function onDecreaseQuantity(index) {
    let basketLocal = {};
    // Get specific product from list of products

    let productIndex = productsList.products.findIndex((product) => {
      return product._id === basketItems[index].productId._id;
    });
    // Compare basket quantity to Product stock

    if (basketItems[index].quantity > 0) {
      basketItems[index].quantity--;
      basket.basket.products = basketItems;
      basketLocal = basket.basket;
      await dispatch(updateBasket(basketLocal));
    }

    if (basketItems[index].quantity == 0) {
      await oneDeleteProduct(index);
    }
  }

  async function oneDeleteProduct(index) {
    let basketLocal = basket.basket;
    basketLocal.products.splice(index, 1);
    await dispatch(updateBasket(basketLocal));
  }

  const color = 'light';
  // display as list
  if (location.pathname === '/basket') {
    return (
      <>
        {/* Table notus */}
        <>
          <Navbar />
          <section className="relative block py-24  bg-green-800	">
            <div className="container my-6 px-4 ">
              <div className="">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-green-50">
                  <div
                    style={{
                      margin: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleBackToProductsList}
                    >
                      {' '}
                      <FontAwesomeIcon icon={faArrowRight} rotation={180} />
                      &nbsp;&nbsp; Back to Products List
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleProceedToCheckout}
                    >
                      Proceed to Checkout&nbsp;&nbsp;
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Button>
                  </div>
                  <div className="flex-auto p-5 lg:p-10">
                    <div
                      className={
                        'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ' +
                        (color === 'light'
                          ? 'bg-white'
                          : 'bg-lightBlue-900 text-white')
                      }
                    >
                      <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3
                              className={
                                'font-semibold text-lg ' +
                                (color === 'light'
                                  ? 'text-blueGray-700'
                                  : 'text-white')
                              }
                            >
                              Card Tables
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="block w-full overflow-x-auto">
                        {/* Projects table */}
                        <table className="items-center w-full bg-transparent border-collapse">
                          <thead>
                            <tr>
                              <th
                                className={
                                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-right ' +
                                  (color === 'light'
                                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                }
                              >
                                name
                              </th>
                              <th
                                className={
                                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-right ' +
                                  (color === 'light'
                                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                }
                              >
                                price
                              </th>
                              <th
                                className={
                                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-right ' +
                                  (color === 'light'
                                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                }
                              >
                                quantity
                              </th>

                              <th
                                className={
                                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-right ' +
                                  (color === 'light'
                                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                }
                              >
                                Remove
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {filtered_list &&
                              basketItems.map((product, index) => (
                                <tr key={product._id}>
                                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                    <img
                                      src={filtered_list[index]?.image.url}
                                      className="h-12 w-12 bg-white rounded-full border"
                                      alt="..."
                                    ></img>{' '}
                                    <span
                                      className={
                                        'ml-3 font-bold ' +
                                        +(color === 'light'
                                          ? 'text-blueGray-600'
                                          : 'text-white')
                                      }
                                    >
                                      {product.name}
                                    </span>
                                  </th>
                                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {product.price.toFixed(2)} TND
                                  </td>
                                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <i className="fas fa-circle text-orange-500 mr-2"></i>{' '}
                                    <Button
                                      onClick={() => onDecreaseQuantity(index)}
                                    >
                                      -
                                    </Button>
                                    {product.quantity}
                                    <Button
                                      onClick={() => onIncreaseQuantity(index)}
                                    >
                                      +
                                    </Button>
                                  </td>

                                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                    <button
                                      className="text-red-500 background-transparent font-bold uppercase px-8 py-3 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                      type="button"
                                    >
                                      <Button
                                        onClick={() => oneDeleteProduct(index)}
                                      >
                                        <FontAwesomeIcon icon={faXmark} />
                                      </Button>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
        {/* end Table notus */}
      </>
    );
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <></>;
  }

  if (basketItems == null) {
    return <p>Your basket is empty.</p>;
  }

  // display as popup
  return (
    <>
      <IconButton
        onClick={handleBasketDialog}
        className="text-blueGray-400 fas fa-shopping-basket text-lg leading-lg mr-2"
      >
        <Typography variant="body1" color="inherit">
          {basketItems.length}
        </Typography>
      </IconButton>

      <Dialog open={isOpen} onClose={handleBasketDialog}>
        <DialogTitle>
          Your Basket
          <IconButton
            onClick={handleBasketDialog}
            style={{ position: 'absolute', right: 10, top: 10 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {basketItems.map((product) => (
                  <TableRow key={product.productId}>
                    <TableCell component="th" scope="row">
                      {product.name}
                    </TableCell>
                    <TableCell align="right">{product.price}</TableCell>
                    <TableCell align="right">{product.quantity}</TableCell>
                    <TableCell align="right">
                      {product.price * product.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBasketDialog} color="primary">
            Close
          </Button>
          <Link to="/basket">
            <Button color="primary">Basket</Button>
          </Link>
          <Link to="/checkout">
            <Button color="primary">Checkout</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default BasketPage;
