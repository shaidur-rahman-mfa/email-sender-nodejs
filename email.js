const nodemailer = require('nodemailer');

// Create a transporter with your SMTP configuration
const transporter = nodemailer.createTransport({
    host: 'localhost',  // Replace with your SMTP server host
    port: 2525,                // Replace with your SMTP server port
    secure: false,            // Set to true if using a secure connection (e.g., SSL/TLS)
});

let fromMail = 'shaidur@email.com';
let toMail = 'shaidur2@email.com';
let subj = 'Email subject';

let emailBody = `Email body text goes here...`;
let emailAttachmentData = `Attachment data goes here...`;


sendMail();


function sendMail() {
    // Email content
    const mailOptions = {
        from: fromMail,  // Sender email address
        to: toMail,  // Recipient email address
        cc: 'shaidur3@email.com',
        subject: subj,
        raw: getRawMessage(emailBody, emailAttachmentData, subj, toMail, null, null) // raw email content
    };

    // Send the email
    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.error('Error:', error.message, error);
            }
            console.log('Email sent:', info.response);
        });
    } catch (error) {
        console.error(error);
    }
}

function getRawMessage(bodyText, attachmentData, subject, toAddress, ccAddress, bccAddress) {
    const boundary = `${Math.random().toString().substring(2)}`;

    let addresses = [
        `From: ${fromMail}`,
        `To: ${toAddress}`,
    ];
    if (ccAddress) addresses.push(`CC: ${ccAddress}`);
    if (bccAddress) addresses.push(`BCC: ${bccAddress}`);

    let rawMessage = [
        `MIME-Version: 1.0`,
        addresses.join('\n'),
        `Subject: ${subject}`,
        `Content-Type: multipart/mixed; boundary="${boundary}"`,
        `\n`,
    ];

    if (bodyText) {
        rawMessage.push(`--${boundary}`);
        rawMessage.push(`Content-Type: text/plain; charset="UTF-8"`);
        rawMessage.push(`\n`);
        rawMessage.push(`${bodyText}`);
        rawMessage.push(`\n`);
    }
    if (attachmentData) {
        rawMessage.push(`--${boundary}`);
        rawMessage.push(`Content-Type: text/plain; charset="UTF-8"; name="attachment.txt"`);
        rawMessage.push(`Content-Disposition: attachment; filename="attachment.txt"`);
        rawMessage.push(`Content-Transfer-Encoding: 8bit`);
        rawMessage.push(`\n`);
        rawMessage.push(attachmentData);
    }
    rawMessage.push(`--${boundary}--`);
    return rawMessage.join('\n');
}
