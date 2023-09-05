import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Chart from 'chart.js';
import { useRef } from 'react';
import img from '../../../../assets/img/icons8-christmas-star-color-16.png';

function Stat() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    axios
      .get('https://he-bosses-pi-dev-api.onrender.com/rate/getstarRating')
      .then((response) => {
        setRatings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const canvasRef = useRef(null);
  //console.log("__"+ratings.map((item)=>console.log(item.star)))
  function getRatingCounts(ratings) {
    return ratings.reduce((acc, rating) => {
      const stars = rating.star;
      if (!acc[stars]) {
        acc[stars] = 1;
      } else {
        acc[stars]++;
      }
      return acc;
    }, {});
  }
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const ratingCounts = getRatingCounts(ratings);
    const chartData = {
      labels: Object.keys(ratingCounts),
      datasets: [
        {
          data: Object.values(ratingCounts),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
          ],
        },
      ],
    };
    const chartOptions = {
      responsive: true,
    };
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: chartData,
      options: chartOptions,
    });
  }, [ratings]);

  console.log('****' + Object.values(getRatingCounts));
  return (
    <>
      <>
        <div className=" flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-8 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full  flex-1">
                <h3 className="font-semibold text-base text-blueGray-700 d-flex align-items-center">
                  Statistics of Ratings
                </h3>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead className="thead-light"></thead>
              <tbody>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}
                >
                  {ratings.map((item, index) => (
                    <img src={img} />
                  ))}{' '}
                </div>
                <div
                  style={{
                    marginLeft: '110px',
                    heigh: '300px',
                    width: '300px',
                    paddingBottom: '120px',
                  }}
                >
                  <canvas ref={canvasRef}></canvas>
                </div>
              </tbody>
            </table>
          </div>
        </div>
      </>
    </>
  );
}

export default Stat;
