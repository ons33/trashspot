import PropTypes from 'prop-types';
import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getReports } from '../../../../redux/actions/profileActions';
import { useEffect } from 'react';
// components

import TableDropdown from '../Dropdowns/TableDropdown';
import axios, { Axios } from 'axios';
import Pagination from './Pagination';

export default function CardListReports({ color }) {


    const [Reports, setReports] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = Reports  .slice(firstPostIndex, lastPostIndex);


  const handleClick = (_id) => {
  
      axios
        .delete(`https://he-bosses-pi-dev-api.onrender.com/support/deleteReport/${_id}`)
        .then(() => {
          setReports(Reports.filter((rating) => rating._id !== _id));
        })
        .catch((error) => {
          console.log(error);
        });
  
        }

 const updateToTreated = (_id) => {
  
    axios
      .put(`https://he-bosses-pi-dev-api.onrender.com/support/updateReport/${_id}`,{state:"treated"})
      .then((res) => {
        const updatedReport = res.data;
        setReports(
          Reports.map((report) =>
            report._id === updatedReport._id ? updatedReport : report
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });

      }
 const updateNotTreated = (_id) => {
  
        axios
          .put(`https://he-bosses-pi-dev-api.onrender.com/support/updateReport/${_id}`,{state:"not treated"})
          .then((res) => {
            const updatedReport = res.data;
            setReports(
              Reports.map((report) =>
                report._id === updatedReport._id ? updatedReport : report
              )
            );
          })
          .catch((error) => {
            console.log(error);
          });
    
          }
useEffect(() => {
    axios
      .get("https://he-bosses-pi-dev-api.onrender.com/support/getAllReports")
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [Reports]);


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
              List of Reports
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
                User ID
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                }
              >
                Subject
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                }
              >
                description
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                }
              >
                State Of Report
              </th>
              <th
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                }
              >
                Date sent
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
            {currentPosts.map((user, index) => (
              <tr key={index}>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <span
                    className={
                      'ml-3 font-bold ' +
                      +(color === 'light' ? 'text-blueGray-600' : 'text-white')
                    }
                  >
                    {user.username}
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {user.subject}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  
                  {user.description}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  
                    {user.state =="not treated" ? 
                    (<i className="fas fa-circle text-red-500 mr-2" style={{cursor:"pointer"}} onClick={()=>updateToTreated(user._id)}>not Treated</i>)
                    :(<i className="fas fa-circle text-green-500 mr-2" style={{cursor:"pointer"}} onClick={()=>updateNotTreated(user._id)}> treated</i>)}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-orange-500 mr-2"></i>{' '}
                  {user.date}
                </td>
               

                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                <i class="fa fa-trash text-red-500"style={{cursor:"pointer",fontSize:"25px"}} onClick={()=>handleClick(user._id)} aria-hidden="true"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
                totalPosts={Reports.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
      </div>
  
    </div>
  );
}
CardListReports.defaultProps = {
  color: 'light',
};

CardListReports.propTypes = {
  color: PropTypes.oneOf(['light', 'dark']),
};
