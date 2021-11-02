const users = [];

const cleanData = data => data.trim().toLowerCase();

const addUser = ({ id, username, room }) => {
    cleanData(username);
    cleanData(room);

    if (!username || !room) {
        return { error: 'Username and room are required.' }
    }

    const existingUser = users.find(user => user.room === room && user.username === username);

    if (username) {
        return { error: 'Username is in use.' }
    }

    const user = { id, username, room };
    users.push(user);
    return { user };
};

const removedUser = id => {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = id => users.findIndex(user => user.id === id);

const getUsersInRoom = room => users.filter(user => user.room === room);

module.exports = { addUser, removedUser, getUser, getUsersInRoom };