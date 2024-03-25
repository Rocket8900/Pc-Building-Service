const sendRepairStatusMail = require('../templates/sendRepairStatusMail');

function handleRepairEmails(messageContent) {
    switch (messageContent.purpose) {
        case "updateStatus":
            sendRepairStatusMail(messageContent)
            break;
        
        default:
            break;
    }
}

module.exports = handleRepairEmails;