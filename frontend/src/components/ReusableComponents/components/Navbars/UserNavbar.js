import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../../../redux/actions/authActions';
import { Link, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import backgroundImage from '../../../../assets/img/uu.png';

import { Disclosure, Menu, Transition } from '@headlessui/react';
import UserDropdown from '../Dropdowns/UserDropdown';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';
import i18next from 'i18next';
import imgFr from '../../../../assets/img/icons8-france-32.png';
import imgBr from '../../../../assets/img/icons8-great-britain-32.png';
import imgTn from '../../../../assets/img/tunisia-flag-round-icon-32.png';
import './nav.css';
import BasketPage from '../../../../pages//Basket/BasketPage';
import { GetProfile } from '../../../../redux/actions/profileActions';

export default function Navbar() {
  let location = useLocation();
  const languages = [
    {
      icon: imgFr,
      code: 'fr',
      name: 'Français',
      country_code: 'fr',
    },
    {
      icon: imgBr,
      code: 'en',
      name: 'English',
      country_code: 'gb',
    },
    {
      icon: imgTn,
      code: 'ar',
      name: 'العربية',
      dir: 'rtl',
      country_code: 'sa',
    },
  ];

  const GlobeIcon = ({ width = 24, height = 24 }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="currentColor"
      className="bi bi-globe"
      viewBox="0 0 16 16"
    >
      <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
    </svg>
  );
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  console.log('hedha tranlsatoi' + JSON.stringify(Object.entries(t)));

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  const dispatch = useDispatch();
  const LogoutHanlder = () => {
    dispatch(Logout());
  };
  console.log(localStorage.getItem('jwt'));
  const token = localStorage.getItem('jwt');
  console.log(jwt_decode(token));
  const id = jwt_decode(token).id;
  const navigation = [
    { name: t('Home'), href: '/', current: true },
    { name: t('Profile'), href: `/formPart/${id}`, current: false },
    { name: t('Recepies'), href: '/recipes', current: false },
    { name: t('Products'), href: `/allProducts`, current: false },
    { name: t('TrashSpot'), href: '/trashSpot', current: false },
    { name: t('Support Center'), href: '/support', current: false },
    { name: t('Basket'), href: '/basket', current: false },
    { name: t('Restaurants'), href: `/professionalPage`, current: false },
  ];
  const userConnected = useSelector((state) => state.profiles.profile);
  useEffect(() => {
    console.log('Setting page stuff');
    document.body.dir = currentLanguage.dir || 'ltr';
    document.title = t('0 Waste');
    dispatch(GetProfile(id));
  }, []);
  

  return (
    <Disclosure
      as="nav"
      className=" txt-white"
      style={{ boxShadow: '0 2px 4px rgba(0,0,0,.2)' ,position: "sticky",
    top: 0,
    zIndex: 2,
    background: "white"}}
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button  style = {{"width": "50px","height": "50px"}} className="buttonNavMahdi inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="hidden h-16 w-16 lg:block"
                    src={backgroundImage}
                    alt="0 Waste"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? ' no-underline bg-green-500 text-white my-4 font-semibold'
                            : 'no-underline text-teal-800 font-normal hover:bg-green-500 hover:text-white my-4',
                          'rounded-md px-3 py-2 text-md font-bold my-4 no-underline'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <li className="flex items-center">
                {location.pathname !== '/basket' && <BasketPage />}
              </li>
              <div className="dropdown mt-6" style={{ display: 'block' }}>
                <button
                  style={{ display: 'block !important' }}
                  className="btn btn-link dropdown-toggle ml-6"
                  data-bs-toggle="dropdown"
                >
                  <GlobeIcon />
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                  style={{ display: 'block !important' }}
                >
                  <li>
                    <span className="dropdown-item-text">{t('language')}</span>
                  </li>
                  {languages.map(({ code, name, country_code, icon }) => (
                    <li key={country_code}>
                      <a
                        href="/"
                        className="dropdown-item"
                        onClick={() => {
                          // event.preventDefault()
                          i18next.changeLanguage(code);
                        }}
                      >
                        <img src={icon} />
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div>
                  <br></br>
                  {/* <h6>
                    {user1?.provider === 'facebook'
                      ? user1?.displayName
                      : user1?.firstName + ' ' + user1?.lastName}
                  </h6> */}
                </div>
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={userConnected.image?.url}
                        alt=""
                        style={{ height: '50px', width: '50px' }}
                        referrerPolicy="no-referrer"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                            to={`/formPart/${id}`}
                          >
                            {t('My Profile')}
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                            to={`/productsCreated`}
                          >
                            MY Products
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                            to={`/favoris`}
                          >
                            My Favorites
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            {t('settings')}
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                            to="/login"
                            onClick={LogoutHanlder}
                          >
                            {' '}
                            {t('Sign out')}
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}