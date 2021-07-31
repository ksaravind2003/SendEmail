var AWS = require('aws-sdk');
require('dotenv').config();

// Set the region 
AWS.config.update({ region: process.env.REGION });

let guid = len => {
    var buf = [],
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charlen = chars.length,
        length = len || 32;

    for (var i = 0; i < length; i++) {
        buf[i] = chars.charAt(Math.floor(Math.random() * charlen));
    }

    return buf.join('');
}

var params = {
    Destination: { /* required */
        BccAddresses: [
            /* more items */
        ],
        CcAddresses: [
            /* more items */
        ],
        ToAddresses: [
            process.env.TO_EMAIL_ADDRESS,
            /* more items */
        ]
    },
    Source: process.env.SENDER_EMAIL_ADDRESS, /* required */
    Template: process.env.SES_TEMPLATENAME, /* required */
    TemplateData: '{ \"FormName\":\"Submission Form\", \"name\":\"Aravind\", \"RequestID\":\"'
    + guid()+'\", \"SupportEmail\": \"support@gmail.com\"}', /* required */    
    ReplyToAddresses: [
        process.env.TO_EMAIL_ADDRESS,
        /* more items */
    ]    
};

console.log(params)

// Create the promise and SES service object
var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendTemplatedEmail(params).promise();

// Handle promise's fulfilled/rejected states
sendPromise.then(
    function (data) {
        console.log(data.MessageId);
    }).catch(
        function (err) {
            console.error(err, err.stack);
        });


