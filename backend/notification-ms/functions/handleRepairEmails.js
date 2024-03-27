const sendRepairStatusMail = require('../templates/sendRepairStatusMail');
const sendRepairAssignMail = require('../templates/sendRepairAssignMail');
const sendRepairPartMail = require('../templates/sendRepairPartMail');

function handleRepairEmails(messageContent) {
    switch (messageContent.purpose) {
        case "updateStatus":
            sendRepairStatusMail(messageContent)
            break;
        case "assignEmployee":
            sendRepairAssignMail(messageContent)
        case "repairPart":
            sendRepairPartMail(messageContent)
        default:
            break;
    }
}

module.exports = handleRepairEmails;