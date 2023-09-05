import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { getBasket } from '../../redux/actions/basketActions';

import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm.js';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';

import Navbar from '../../components/ReusableComponents/components/Navbars/UserNavbar';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
} from '@material-ui/core';
import IndexNavbar from '../../components/ReusableComponents/components/Navbars/IndexNavbar';
import BasketPage from './BasketPage';
import GetPosition from '../GetMyPosition/GetPosition';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  button: {
    width: '100%',
    maxWidth: 250,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'top',
  },
  list: {
    backgroundColor: '#F1F8E9', // green background color
    borderRadius: '10px',
    padding: '20px',
  },
  listItem: {
    backgroundColor: 'white',
    borderRadius: '10px',
    marginBottom: '10px',
    marginRight: '2em',
  },
  listItemText: {
    color: '#4CAF50', // green text color
  },
  avatar: {
    width: '60px',
    height: '60px',
    padding: '2em',
    marginRight: '2em',
  },
}));

function Checkout() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userId = useSelector((state) => state.auth.user.id);
  //const basket = useSelector((state) => state.basket);
  let { basket, loading, error, basketItems } = useSelector(
    (state) => state.basket
  );
  const productsList = useSelector((state) => state.productList);

  /// Load images
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

    console.log('filtered list', filtered_list);
  }
  // end Load images

  const [payMethod, setPayMethod] = useState('bank');

  async function getExistingBasket() {
    await dispatch(getBasket(userId));
  }

  useEffect(() => {
    getExistingBasket().then((r) => console.log('basket got ', r));
  }, []);

  console.log('basket', basket);

  const handleSubmit = (event) => {
    event.preventDefault();
    // validate payMethod and submit the form
  };

  const handlePaymentMethodChange = (event) => {
    setPayMethod(event.target.value);
  };

  const handlePayDelivery = () => {
    console.log('pay on delivery ');
    let method = 0;
    fetch(`https://he-bosses-pi-dev-api.onrender.com/delivery/add/${userId}/${method}`, {
      method: 'PUT',
      body: JSON.stringify({}),
    });
    navigate('/allProducts');
  };

  useEffect(() => {
    fetch('https://he-bosses-pi-dev-api.onrender.com/stripe/config').then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    if (basket !== null) {
      const fetchData = async () => {
        fetch(`https://he-bosses-pi-dev-api.onrender.com/stripe/create-payment-intent/${userId}`, {
          method: 'PUT',
          body: JSON.stringify({}),
        }).then(async (result) => {
          var { clientSecret } = await result.json();
          setClientSecret(clientSecret);
        });
      };
      fetchData();
    }
  }, [basket]);

  return (
    <>
      <Navbar />
      <section className="relative block py-24  bg-green-800	">
        <div className="container my-6 px-4 ">
          <div className="">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-green-50">
              <div className="flex-auto p-5 lg:p-10">
                <div style={{ marginTop: 5 + 'em' }}>
                  {/* <BasketPage/> */}
                  {/* Basket Items */}

                  {loading ? (
                    <h2>Loading...</h2>
                  ) : error ? (
                    <h2>{error}</h2>
                  ) : basket != null ? (
                    <div className={classes.formContainer}>
                      <h2>Basket</h2>
                      {filtered_list && basket.products && (
                        <List className={classes.list}>
                          {basket.products.map((product, index) => (
                            <ListItem
                              key={product._id}
                              className={classes.listItem}
                            >
                              <ListItemAvatar>
                                <img
                                  src={filtered_list[index]?.image.url}
                                  className="h-12 w-12 bg-white rounded-full border"
                                  alt="..."
                                ></img>{' '}
                              </ListItemAvatar>
                              <ListItemText
                                primary={product.name}
                                secondary={product.quantity}
                                classes={{ primary: classes.listItemText }}
                              />
                              <ListItemText
                                primary={'total product price'}
                                secondary={`${
                                  product.price * product.quantity
                                } TND`}
                                classes={{ primary: classes.listItemText }}
                                style={{ textAlign: 'right' }}
                              />
                              {/* <ListItemText
                                primary={product.name}
                                secondary={product.quantity}
                                classes={{ primary: classes.listItemText }}
                              /> */}
                              {/* <ListItemText
                                primary={product.price * product.quantity}
                                classes={{ primary: classes.listItemText }}
                              ></ListItemText> */}
                            </ListItem>
                          ))}
                        </List>
                      )}
                      <p>Total price: TND {basket.totalPrice}</p>
                    </div>
                  ) : (
                    <div>hello</div>
                  )}

                  {/* End Basket Items  */}

                  <p>Selected payment method: {payMethod}</p>

                  <form onSubmit={handleSubmit}>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">
                        Choose Payment Method
                      </FormLabel>
                      <RadioGroup
                        aria-label="payment-method"
                        name="payment-method"
                        value={payMethod}
                        onChange={handlePaymentMethodChange}
                      >
                        <FormControlLabel
                          value="bank"
                          control={<Radio />}
                          label="Pay with Bank Card"
                        />
                        <FormControlLabel
                          value="delivery"
                          control={<Radio />}
                          label="Pay on Delivery"
                        />
                      </RadioGroup>
                    </FormControl>
                    {payMethod === 'delivery' && (
                      <Box className={classes.buttonContainer}>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          type="submit"
                          onClick={handlePayDelivery}
                        >
                          Submit Order
                        </Button>
                      </Box>
                    )}
                    <GetPosition></GetPosition>
                  </form>
                  <>
                    {clientSecret && payMethod === 'bank' && stripePromise && (
                      <Elements
                        stripe={stripePromise}
                        options={{ clientSecret }}
                      >
                        <CheckoutForm />
                      </Elements>
                    )}
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>{' '}
    </>
  );
}

export default Checkout;
