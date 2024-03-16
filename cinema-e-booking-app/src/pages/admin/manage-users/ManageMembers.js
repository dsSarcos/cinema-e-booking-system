import React, {useEffect, useState} from "react"
import "./ManageMembers.css"

export const ManageMembers = () => {

    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        fetch('http://localhost:3000/api/members')
        .then(response => response.json())
        .then(users => setUsers(users))
        .catch(error => console.error(error));
    };

    const suspendUser = (id) =>{
        fetch(`/api/users/manage/suspend/${id}`, {method: 'POST'})
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Suspended user:', data);
            getUsers();
          })
          .catch(error => console.error(error));
    };

    const unsuspendUser = (id) =>{
        fetch(`/api/users/manage/unsuspend/${id}`, {method: 'POST'})
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Unsuspended user:', data);
            getUsers();
          })
          .catch(error => console.error(error));
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

    const subscribeUser = (id) =>{
        fetch(`/api/users/manage/subscribe/${id}`, {method: 'POST'})
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Subscribed user:', data);
            getUsers();
          })
          .catch(error => console.error(error));
    };

    const unsubscribeUser = (id) =>{
        fetch(`/api/users/manage/unsubscribe/${id}`, {method: 'POST'})
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Unsubscribed user:', data);
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
          case "Subscribe":
            subscribeUser(id);
            break;
          case "Unsubscribe":
            unsubscribeUser(id);
            break;
          case "Suspend":
            suspendUser(id);
            break;
          case "Unsuspend":
            unsuspendUser(id);
            break;
          default:
        }
      }
    };

    const deleteUser = (id) => {
      fetch(`/api/users/delete/${id}`, {method: 'DELETE'})
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Deleted user:', data);
            getUsers();
          })
          .catch(error => console.error(error));
    };

    const confirmDelete = (item) => {
      const confirmed = window.confirm(`Delete ${item.FirstName + " " + item.LastName}'s account?\n\nThis action cannot be undone`)
      var id = item.ID;
      if (confirmed) {
        deleteUser(id);
      }
    };

    return (
        <div className="manage-members-container">
            <h1>Manage Members</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Status</th>
                            <th>Subscribed</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(item => (
                            <tr>
                                <td key={item.id}>{item.FirstName + " " + item.LastName}</td>
                                <td key={item.id}>{item.Email}</td>
                                <td key={item.id}>
                                    {item.IsAdmin === 0 && (<button id="manage-members-button" onClick={() => confirmAction(item, "Promote")}>Promote</button>)}
                                    {item.IsAdmin === 1 && (<button id="manage-members-button" onClick={() => confirmAction(item, "Demote")}>Demote</button>)}
                                </td>
                                <td key={item.id}>
                                    {item.IsActive === 1 && (<button id="manage-members-button" onClick={() => confirmAction(item, "Suspend")}>Suspend</button>)}
                                    {item.IsActive === 2 && (<button id="manage-members-button" onClick={() => confirmAction(item, "Unsuspend")}>Unsuspend</button>)}
                                    {item.IsActive === 0 && ("Inactive")}
                                </td>
                                <td key={item.id}>
                                    {item.IsRegistered === 0 && (<button id="manage-members-button" onClick={() => confirmAction(item, "Subscribe")}>Subscribe</button>)}
                                    {item.IsRegistered === 1 && (<button id="manage-members-button" onClick={() => confirmAction(item, "Unsubscribe")}>Unsubscribe</button>)}
                                </td>
                                <td key={item.id}><button id="delete-member-button" onClick={() => confirmDelete(item)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}