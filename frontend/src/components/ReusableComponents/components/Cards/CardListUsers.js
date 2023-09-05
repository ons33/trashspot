import PropTypes from 'prop-types';
import { React } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUsers } from '../../../../redux/actions/profileActions';
import { useEffect } from 'react';
// components

import TableDropdown from '../Dropdowns/TableDropdown';

export default function CardListUsers({ color }) {
  // const getListUsers = async () => {
  //   const dispatch = useDispatch();
  //   const errors = useSelector((state) => state.errors);
  //   const navigate = useNavigate();
  //   dispatch(GetUsersAction(navigate));
  // };

  const profiles = useSelector((state) => state.profiles);
  const dispatch = useDispatch();
  const test = async () => {
    await dispatch(getUsers());
  };
  useEffect(() => {
    test();
  }, []);
  const data = profiles.profiles;
  console.log('this is data', profiles.profiles);
  const x = data.map((value) => {
    console.log(value);
    return value;
  });
  return (
    <div
      className={
        'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ' +
        (color === 'light' ? 'bg-white' : 'bg-lightBlue-900 text-white')
      }
    >
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3
              className={
                'font-semibold text-lg ' +
                (color === 'light' ? 'text-blueGray-700' : 'text-white')
              }
            >
              List of Users
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
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                }
              >
                First name
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                }
              >
                Last name
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                }
              >
                Email
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                }
              >
                Phone number
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                }
              >
                Role
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                }
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <img
                    src={
                      require('../../../../assets/img/bootstrap.jpg').default
                    }
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>{' '}
                  <span
                    className={
                      'ml-3 font-bold ' +
                      +(color === 'light' ? 'text-blueGray-600' : 'text-white')
                    }
                  >
                    {user.firstName}
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {user.lastName}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-orange-500 mr-2"></i>{' '}
                  {user.email}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-orange-500 mr-2"></i>{' '}
                  {user.phoneNumber}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-orange-500 mr-2"></i>{' '}
                  {user.role}
                </td>

                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                  <TableDropdown user={user} />
                  <button></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
CardListUsers.defaultProps = {
  color: 'light',
};

CardListUsers.propTypes = {
  color: PropTypes.oneOf(['light', 'dark']),
};
