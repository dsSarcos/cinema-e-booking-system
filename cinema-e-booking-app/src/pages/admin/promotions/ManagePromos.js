import React, { useEffect, useState } from "react"
import "./ManagePromos.css";

export const ManagePromos = () => {

    const [promotions, setPromotions] = useState([]);

    useEffect(() => {
        getPromotions();
    }, []);

    const getPromotions = () => {
        fetch('http://localhost:3000/api/promotions')
        .then(response => response.json())
        .then(promotions => setPromotions(promotions))
        .catch(error => console.error(error));
    };

    const deleteRow = (id) => {
        fetch(`/api/promotions/delete/${id}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Successfully deleted row:', data);
            getPromotions();
          })
          .catch(error => console.error(error));
      };

    return (
        <div className="manage-promotions-container">
            <h1>Manage Promotions</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Discount</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {promotions.map(item => (
                            <tr>
                                <td key={item.id}>{item.Name}</td>
                                <td key={item.id}>{item.Code}</td>
                                <td key={item.id}>{item.Discount}</td>
                                <td key={item.id}>{item.StartDate}</td>
                                <td key={item.id}>{item.EndDate}</td>
                                <hr/>
                            </tr>
                        ))}  
                    </tbody>    
                </table>
            </div>
        </div>
    )
}