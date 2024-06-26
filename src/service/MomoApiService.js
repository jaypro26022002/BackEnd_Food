import https from 'https';
import crypto from 'crypto';

const partnerCode = 'MOMO';
const accessKey = 'F8BBA842ECF85';
const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';

const redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
const ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
const requestType = "payWithATM"; // Ensure this matches the expected value by MoMo

const createPayment = ({ items, total, paymentMethod }) => {
    return new Promise((resolve, reject) => {
        const orderInfo = 'Thanh toán qua MoMo';
        console.log('Total before conversion:', total); // Log the total value

        // Ensure the total is a valid number and convert it to cents
        if (isNaN(total)) {
            reject(new Error('Invalid total amount'));
            return;
        }

        const amount = Math.round(total * 1000).toString(); // Ensure amount is in the smallest currency unit (e.g., cents)
        const orderId = partnerCode + new Date().getTime();
        const requestId = orderId;
        const extraData = ''; // Add any extra data if needed

        const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
        const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

        const requestBody = JSON.stringify({
            partnerCode,
            partnerName: "Test",
            storeId: "MomoTestStore",
            requestId,
            amount,
            orderId,
            orderInfo,
            redirectUrl,
            ipnUrl,
            lang: 'vi',
            requestType,
            extraData,
            signature
        });

        console.log('Request Body:', requestBody);

        const options = {
            hostname: 'test-payment.momo.vn',
            path: '/v2/gateway/api/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody)
            }
        };

        const req = https.request(options, res => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', chunk => {
                body += chunk;
            });
            res.on('end', () => {
                try {
                    const response = JSON.parse(body);
                    console.log('MoMo Response:', response);
                    if (response.resultCode === 0) {
                        resolve({ payUrl: response.payUrl });
                    } else {
                        console.error(`Error from MoMo: ${response.localMessage}, resultCode: ${response.resultCode}, response: ${body}`);
                        reject(new Error(`Error from MoMo: ${response.localMessage}`));
                    }
                } catch (e) {
                    console.error('Failed to parse MoMo response', e, body);
                    reject(new Error('Failed to parse MoMo response'));
                }
            });
        });

        req.on('error', (e) => {
            console.error('Request error:', e);
            reject(e);
        });

        req.write(requestBody);
        req.end();
    });
};

export default {
    createPayment
};


// import https from 'https';
// import crypto from 'crypto';

// const partnerCode = 'MOMO';
// const accessKey = 'F8BBA842ECF85';
// const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';

// const redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
// const ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
// const requestType = "payWithATM";

// const createPayment = ({ items, total, paymentMethod }) => {
//     return new Promise((resolve, reject) => {
//         const orderInfo = 'Thanh toán qua MoMo';
//         const amount = '50000'; // Use the total amount from the request
//         const orderId = partnerCode + new Date().getTime();
//         const requestId = orderId;
//         const extraData = '';

//         const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
//         const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

//         const requestBody = JSON.stringify({
//             partnerCode,
//             partnerName: "Test",
//             storeId: "MomoTestStore",
//             requestId,
//             amount,
//             orderId,
//             orderInfo,
//             redirectUrl,
//             ipnUrl,
//             lang: 'vi',
//             requestType,
//             extraData,
//             signature
//         });

//         const options = {
//             hostname: 'test-payment.momo.vn',
//             path: '/v2/gateway/api/create',
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Content-Length': Buffer.byteLength(requestBody)
//             }
//         };

//         const req = https.request(options, res => {
//             res.setEncoding('utf8');
//             let body = '';
//             res.on('data', chunk => {
//                 body += chunk;
//             });
//             res.on('end', () => {
//                 try {
//                     const response = JSON.parse(body);
//                     if (response.resultCode === 0) {
//                         resolve({ payUrl: response.payUrl });
//                     } else {
//                         reject(new Error(`Error from MoMo: ${response.localMessage}`));
//                     }
//                 } catch (e) {
//                     reject(new Error('Failed to parse MoMo response'));
//                 }
//             });
//         });

//         req.on('error', (e) => {
//             reject(e);
//         });

//         req.write(requestBody);
//         req.end();
//     });
// };

// export default {
//     createPayment
// };



// let result;
// try {
//     result = await axios(options);
//     return res.status(200).json(result.data);
// } catch (error) {
//     return res.status(500).json({
//         statusCode: 500,
//         message: "server error"
//     })
// }
// })