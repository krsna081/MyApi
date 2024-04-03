const fs = require('fs')

function getVisitors() {
    const data = JSON.parse(fs.readFileSync('../database/visitors.json', 'utf-8'));
    return data.visit
}
function addVisitors() {
    const data = JSON.parse(fs.readFileSync('../database/visitors.json', 'utf-8'));
    visit = data.visit
    visit++
    fs.writeFileSync('../database/visitors.json', JSON.stringify({ visit }));
}

