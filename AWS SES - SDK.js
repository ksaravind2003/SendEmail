// snippet-start:[ses.JavaScript.email.sendEmail]
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
require('dotenv').config();
// Set the region 
AWS.config.update({ region: process.env.REGION });

// Create sendEmail params 
var params = {
    Destination: { /* required */
        CcAddresses: [
            /* more items */
        ],
        ToAddresses: [
            process.env.TO_EMAIL_ADDRESS,
            /* more items */
        ]
    },
    Message: { /* required */
        Body: { /* required */
            Text: {
                Data: `Kudos to the Team on successful completion!
                       Cheers!`,
                Charset: charset 
              },
            Html: {
                Charset: "UTF-8",
                Data: `<html><body><div class=WordSection1>
       <p class=MsoNormal><span style='font-size:10.5pt;font-family:"Calibri Light",sans-serif;
       color:#262626;mso-fareast-language:EN-US'>Kudos to the Team on successful
       completion!<o:p></o:p></span></p>       
       <p class=MsoNormal><span style='font-size:10.5pt;font-family:"Calibri Light",sans-serif;
       color:#262626;mso-fareast-language:EN-US'>Cheers!<o:p></o:p></span></p>       
       <p class=MsoNormal><o:p>&nbsp;</o:p></p>       
       </div></body></html>`
            }
        },
        Subject: {
            Charset: 'UTF-8',
            Data: 'Test email'
        }
    },
    Source: process.env.SENDER_EMAIL_ADDRESS, /* required */
    ReplyToAddresses: [
        process.env.TO_EMAIL_ADDRESS,
        /* more items */
    ],
};

// Create the promise and SES service object
var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

// Handle promise's fulfilled/rejected states
sendPromise.then(
    function (data) {
        console.log(data.MessageId);
    }).catch(
        function (err) {
            console.error(err, err.stack);
        });
