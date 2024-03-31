const sendRepairStatusMail = require('../templates/sendRepairStatusMail');
const sendRepairAssignMail = require('../templates/sendRepairAssignMail');
const sendRepairPartMail = require('../templates/sendRepairPartMail');
const sendRepairCreateMail = require('../templates/sendRepairCreateMail')

function handleRepairEmails(messageContent) {
    switch (messageContent.purpose) {
        case "updateStatus":
            sendRepairStatusMail(messageContent)
            break;
        case "assignEmployee":
            sendRepairAssignMail(messageContent)
            break;
        case "repairPart":
            sendRepairPartMail(messageContent)
            break;
        case "createRepair":
            sendRepairCreateMail(messageContent)
            break;
        default:
            break;
    }
}

module.exports = handleRepairEmails;