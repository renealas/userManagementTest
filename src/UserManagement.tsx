import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

interface Person {
    id: number;
    Name: string;
    "Favorite Food": string;
    "Favorite Movie": string;
    Status: string;
    Date?: string;
}

let rockyObj: Person = {
    id: 1,
    Name: "Rocky",
    "Favorite Food": "Sushi",
    "Favorite Movie": "Back to The Future",
    Status: "Inactive",
};

let miroslavObj: Person = {
    id: 2,
    Name: "Miroslav",
    "Favorite Food": "Sushi",
    "Favorite Movie": "American Psycho",
    Status: "Active",
};

let donnyObj: Person = {
    id: 3,
    Name: "Donny",
    "Favorite Food": "Singapore chow mei fun",
    "Favorite Movie": "The Princess Bride",
    Status: "Inactive",
};

let mattObj: Person = {
    id: 4,
    Name: "Matt",
    "Favorite Food": "Brisket Tacos",
    "Favorite Movie": "The Princess Bride",
    Status: "Active",
};

let reneObj: Person = {
    id: 5,
    Name: "Rene",
    "Favorite Food": "Pupusas",
    "Favorite Movie": "Avengers End Game",
    Status: "Active",
};

export const objectsArray: Person[] = [rockyObj, miroslavObj, donnyObj, mattObj, reneObj];

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<Person[]>(objectsArray);
    const [newUser, setNewUser] = useState<Person>({
        id: users.length + 1,
        Name: "",
        "Favorite Food": "",
        "Favorite Movie": "",
        Status: "Active",
    });
    const [showActiveSorted, setShowActiveSorted] = useState<boolean>(false);
    const [sortedUsers, setSortedUsers] = useState<Person[]>([]);

    const addUser = () => {
        const newUserId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
        const userToAdd = { ...newUser, id: newUserId };
        setUsers((prevUsers) => [...prevUsers, userToAdd]);
        setNewUser({
            id: newUserId + 1,
            Name: "",
            "Favorite Food": "",
            "Favorite Movie": "",
            Status: "Active",
        });
    };

    const toggleUserStatus = (userId: number) => {
        const updatedUsers = users.map((user) =>
            user.id === userId
                ? { ...user, Status: user.Status === "Active" ? "Inactive" : "Active" }
                : user
        );
        setUsers(updatedUsers);

        if (showActiveSorted) {
            const activeUsers = updatedUsers.filter((user) => user.Status === "Active");
            const sortedActiveUsers = activeUsers.sort((a, b) => {
                const aValue = a.Name;
                const bValue = b.Name;
                if (aValue < bValue) return -1;
                if (aValue > bValue) return 1;
                return 0;
            });
            setSortedUsers(sortedActiveUsers);
        }
    };

    const filterAndSortUsers = (sortBy: keyof Person = "Name") => {
        if (showActiveSorted) {
            setShowActiveSorted(false);
            return;
        }

        const activeUsers = users.filter((user) => user.Status === "Active");
        if (activeUsers.length === 0) {
            console.log("No active users found.");
            return;
        }

        const sortedActiveUsers = activeUsers.sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];

            if (aValue !== undefined && bValue !== undefined) {
                if (aValue < bValue) return -1;
                if (aValue > bValue) return 1;
                return 0;
            }

            return 0;
        });

        setSortedUsers(sortedActiveUsers);
        setShowActiveSorted(true);
    };

    const displayUsers = showActiveSorted ? sortedUsers : users.sort((a, b) => {
        const aValue = a.Name;
        const bValue = b.Name;

        if (aValue !== undefined && bValue !== undefined) {
            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
            return 0;
        }

        return 0;
    });

    return (
        <div className="container mt-4">
            <h2>User Management</h2>
            <form className="mb-3">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        id="name"
                        value={newUser.Name}
                        onChange={(e) => setNewUser({ ...newUser, Name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="favoriteFood">Favorite Food</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        id="favoriteFood"
                        value={newUser["Favorite Food"]}
                        onChange={(e) => setNewUser({ ...newUser, "Favorite Food": e.target.value })}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="favoriteMovie">Favorite Movie</label>
                    <input
                        type="text"
                        className="form-control"
                        id="favoriteMovie"
                        value={newUser["Favorite Movie"]}
                        onChange={(e) => setNewUser({ ...newUser, "Favorite Movie": e.target.value })}
                    />
                </div>
                <button type="button" className="btn btn-primary mb-3 mt-3" onClick={addUser}>
                    Add User
                </button>
            </form>
            <button
                type="button"
                className={showActiveSorted ? "btn btn-info mb-2" : "btn btn-warning mb-2"}
                onClick={() => filterAndSortUsers("Name")}
            >
                {showActiveSorted ? "Display All Users" : "Sort Users by Name"}
            </button>
            <ul className="list-group">
                {displayUsers.map((user) => (
                    <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {`Name: ${user.Name}, Status: ${user.Status}`}
                        <div>
                            <button
                                type="button"
                                className="btn btn-danger mr-2"
                                onClick={() => toggleUserStatus(user.id)}
                            >
                                Toggle Status
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;

import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

interface Person {
    Name: string;
    "Favorite Food": string;
    "Favorite Movie": string;
    Status: string;
    Date?: string;
}

let rockyObj: Person = {
    Name: "Rocky",
    "Favorite Food": "Sushi",
    "Favorite Movie": "Back to The Future",
    Status: "Inactive",
};

let miroslavObj: Person = {
    Name: "Miroslav",
    "Favorite Food": "Sushi",
    "Favorite Movie": "American Psycho",
    Status: "Active",
};

let donnyObj: Person = {
    Name: "Donny",
    "Favorite Food": "Singapore chow mei fun",
    "Favorite Movie": "The Princess Bride",
    Status: "Inactive",
};

let mattObj: Person = {
    Name: "Matt",
    "Favorite Food": "Brisket Tacos",
    "Favorite Movie": "The Princess Bride",
    Status: "Active",
};

// Added my object as requested.
let reneObj: Person = {
    Name: "Rene",
    "Favorite Food": "Pupusas",
    "Favorite Movie": "Avengers End Game",
    Status: "Active",
};

export const objectsArray: Person[] = [rockyObj, miroslavObj, donnyObj, mattObj, reneObj];

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<Person[]>(objectsArray);
    const [newUser, setNewUser] = useState<Person>({
        Name: "",
        "Favorite Food": "",
        "Favorite Movie": "",
        Status: "Active",
    });

    const addUser = () => {
        // Add a new user to the array with the values from the form
        setUsers((prevUsers) => [...prevUsers, newUser]);
        // Reset the form fields
        setNewUser({
            Name: "",
            "Favorite Food": "",
            "Favorite Movie": "",
            Status: "Active",
        });
    };

    const toggleUserStatus = (index: number) => {
        // Toggle the status of the selected user (Active/Inactive)
        setUsers((prevUsers) =>
            prevUsers.map((user, i) =>
                i === index
                    ? { ...user, Status: user.Status === "Active" ? "Inactive" : "Active" }
                    : user
            )
        );
    };

    const filterAndSortUsers = (sortBy: keyof Person = "Name") => {
        const activeUsers = users.filter((user) => user.Status === "Active");
        if (activeUsers.length === 0) {
            console.log("No active users found.");
            return;
        }

        const sortedUsers = activeUsers.sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];

            if (aValue !== undefined && bValue !== undefined) {
                if (aValue < bValue) return -1;
                if (aValue > bValue) return 1;
                return 0;
            }

            // Handle the case when sortBy property is undefined for either a or b
            return 0;
        });

        sortedUsers.forEach((user) => {
            console.log(
                `Name: ${user.Name}, Date: ${user.Date}, Favorite Movie: ${user["Favorite Movie"]}`
            );
        });
    };

    return (
        <div className="container mt-4">
            <h2>User Management</h2>
            <form className="mb-3">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={newUser.Name}
                        onChange={(e) => setNewUser({ ...newUser, Name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="favoriteFood">Favorite Food</label>
                    <input
                        type="text"
                        className="form-control"
                        id="favoriteFood"
                        value={newUser["Favorite Food"]}
                        onChange={(e) => setNewUser({ ...newUser, "Favorite Food": e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="favoriteMovie">Favorite Movie</label>
                    <input
                        type="text"
                        className="form-control"
                        id="favoriteMovie"
                        value={newUser["Favorite Movie"]}
                        onChange={(e) => setNewUser({ ...newUser, "Favorite Movie": e.target.value })}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={addUser}>
                    Add User
                </button>
            </form>
            <button type="button" className="btn btn-secondary mb-2" onClick={() => filterAndSortUsers("Name")}>
                Sort Users by Name
            </button>
            <ul className="list-group">
                {users.map((user, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {`Name: ${user.Name}, Status: ${user.Status}`}
                        <div>
                            <button type="button" className="btn btn-danger mr-2" onClick={() => toggleUserStatus(index)}>
                                Toggle Status
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
