const fs = require('fs')
require('../settings')

async function getAllUsers() {
  const data = fs.readFileSync('./database/database.json', 'utf-8');
  return JSON.parse(data);
}

async function addUser(id, username, email, password, apikey) {
  const data = await getAllUsers();
  const newUser = {
      id,
      username,
      email,
      password,
      apikey,
      defaultKey: apikey,
      limit: limitCount
  };
  data.push(newUser);
  fs.writeFileSync('./database/database.json', JSON.stringify(data));
}
module.exports.addUser = addUser

async function limitAdd(apikey) {
    const data = await getAllUsers();
    let userIndex = data.findIndex((user) => user.apikey === apikey)
    if (userIndex === -1) return;
    data[userIndex].limit -= 1
    fs.writeFileSync('./database/database.json', JSON.stringify(data));
}
module.exports.limitAdd = limitAdd

async function checkEmail(email){
    let data = await getAllUsers()
    if (data !== null) {
        let userIndex = data.findIndex((user) => user.email === email)
        if (userIndex === -1) return false;
        return data[userIndex].email;
    } else {
        return false;
    }
}
module.exports.checkEmail = checkEmail;

async function checkUsername(username) {
    let data = await getAllUsers()
    if (data !== null) {
        let userIndex = data.findIndex((user) => user.username === username)
        if (userIndex === -1) return false;
        return data[userIndex].username;
    } else {
        return false;
    }
}
module.exports.checkUsername = checkUsername;

async function cekKey(apikey) {
    let data = await getAllUsers()
    if (data !== null) {
        let userIndex = data.findIndex((user) => user.apikey === apikey)
        if (userIndex === -1) return false;
        return data[userIndex].apikey;
    } else {
        return false;
    }
}
module.exports.cekKey = cekKey;

async function resetAllLimit() {
    try {
        let data = await getAllUsers();
        for (const user of data) {
            if (user.username !== null) {
                user.limit = limitCount;
            }
        }
        fs.writeFileSync('./database/database.json', JSON.stringify(data));
    console.log('Limit reset for all users!');
  } catch (error) {
    console.error('Error resetting limits:', error);
  }
}
module.exports.resetAllLimit = resetAllLimit;

async function isLimit(apikey) {
    let data = await getAllUsers();
    if (data !== null) {
        let userIndex = data.findIndex((user) => user.apikey === apikey)
        if (userIndex === -1) return false;
        if (data[userIndex].limit <= 0){
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
module.exports.isLimit = isLimit;

async function checkLimit(apikey) {
    let data = await getAllUsers();
    if (data !== null) {
        let userIndex = data.findIndex((user) => user.apikey === apikey)
        if (userIndex === -1) return 0;
        return data[userIndex].limit
    } else {
        return 0
    }
}
module.exports.checkLimit = checkLimit;

async function getApikey(id) {
    let data = await getAllUsers();
    if (data !== null) {
        let userIndex = data.findIndex((user) => user.id === id)
        if (userIndex === -1) return 0;
        return {apikey: data[userIndex].apikey, username: data[userIndex].username, limit: data[userIndex].limit};
    }
}
module.exports.getApikey = getApikey;

function getVisitors() {
    const data = JSON.parse(fs.readFileSync('./database/visitors.json', 'utf-8'));
    return data.visit
}
module.exports.getVisitors = getVisitors;

function addVisitors() {
    const data = JSON.parse(fs.readFileSync('./database/visitors.json', 'utf-8'));
    visit = data.visit
    visit++
    fs.writeFileSync('./database/visitors.json', JSON.stringify({ visit }));
}
module.exports.addVisitors = addVisitors
