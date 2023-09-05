import React, { useEffect } from 'react';

import CardListUsers from '../components/ReusableComponents/components/Cards/CardListUsers';
import CardLineChart from '../components/ReusableComponents/components/Cards/CardLineChart';
import CardBarChart from '../components/ReusableComponents/components/Cards/CardBarChart';
import CardSocialTraffic from '../components/ReusableComponents/components/Cards/CardSocialTraffic';
import CardPageVisits from '../components/ReusableComponents/components/Cards/CardPageVisits';
import CardListRatings from '../components/ReusableComponents/components/Cards/CardListRatings';
import Stat from '../components/ReusableComponents/components/Cards/Stat';
function Dashboard() {
  
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-12/12 px-4">
          <CardListUsers />
        </div>
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
  
    </>
  );
}

export default Dashboard;
