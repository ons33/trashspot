import React, { useState,useEffect } from "react";
import axios from "axios";

function RankingTrashPage(props) {

  return (
    <>
      <div className="rankingTrashPage">
        <div className="d-flex justify-content-center">
          <h2>This is the ranking of last 7 days!</h2>
        </div>
        <div className="table-respondsive">
            
          <table  className="table">
            <thead className="text-primary">
                <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Trash Posted</th>
                <th>Trash Collected</th>
                <th>Score</th>
                </tr>
            </thead>
            <tbody>
            {props.rankingPersons.map((person,index) => (
                <tr key={person.id}>
                    <td>{index+1}</td>
                    <td>{person.firstName} {person.lastName}</td>
                    <td>{person.countPostedTrash} * <b>10</b></td>
                    <td>{person.countCollectedTrash} * <b>50</b></td>
                    <td><b>{person.totalPoints}</b></td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default RankingTrashPage;
