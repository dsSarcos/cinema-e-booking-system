import React, {useEffect, useState} from "react"
import "./ManageAdmins.css";

export const ManageAdmins = () => {

    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        fetch('http://localhost:3000/api/admins')
        .then(response => response.json())
        .then(users => setUsers(users))
        .catch(error => console.errror(error));
    };

    const promoteUser = (id) =>{
        fetch(`/api/users/manage/promote/${id}`, {method: 'POST'})
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Promoted user:', data);
            getUsers();
          })
          .catch(error => console.error(error));
    };

    const demoteUser = (id) =>{
        fetch(`/api/users/manage/demote/${id}`, {method: 'POST'})
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Demoted user:', data);
            getUsers();
          })
          .catch(error => console.error(error));
    };

    const confirmAction = (item, action) => {
      const confirmed = window.confirm(`${action} ${item.FirstName + " " + item.LastName}?`)
      var id = item.ID;
      if (confirmed) {
        switch (action) {
          case "Promote":
            promoteUser(id);
            break;
          case "Demote":
            demoteUser(id);
            break;
          default:
        }
      }
    }

    return (
        <div className="manage-admins-container">
            <h1>Manage Admins</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(item => (
                            <tr>
                                <td key={item.id}>{item.FirstName + " " + item.LastName}</td>
                                <td key={item.id}>{item.Email}</td>
                                <td key={item.id}>
                                  {item.IsAdmin === 0 && (<button id="manage-admins-button" onClick={() => confirmAction(item, "Promote")}>Promote</button>)}
                                  {item.IsAdmin === 1 && (<button id="manage-admins-button" onClick={() => confirmAction(item, "Demote")}>Demote</button>)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}