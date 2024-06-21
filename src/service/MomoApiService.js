const createPayment = ({ items, total, paymentMethod }) => {
    return new Promise((resolve, reject) => {
        const orderInfo = 'pay with MoMo';
        const amount = '50000'; // Số tiền thanh toán (đơn vị là đồng)
        const orderId = partnerCode + new Date().getTime(); // Mã đơn hàng, duy nhất dựa trên thời gian
        const requestId = orderId; // ID yêu cầu, cũng là mã đơn hàng trong trường hợp này
        const extraData = ''; // Dữ liệu bổ sung không cần thiết

        // Tạo chữ ký để xác thực yêu cầu
        const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
        const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

        // Tạo body của yêu cầu HTTP dưới dạng JSON
        const requestBody = JSON.stringify({
            partnerCode,
            partnerName: "Test", // Tên đối tác (ở đây là mục đích thử nghiệm)
            storeId: "MomoTestStore", // ID cửa hàng (ở đây là mục đích thử nghiệm)
            requestId,
            amount,
            orderId,
            orderInfo,
            redirectUrl,
            ipnUrl,
            lang: 'vi', // Ngôn ngữ được sử dụng trong giao tiếp
            requestType,
            autoCapture: true, // Tự động thực hiện thanh toán khi được xác nhận
            extraData,
            signature
        });

        // Các tùy chọn cho yêu cầu HTTP
        const options = {
            hostname: 'test-payment.momo.vn', // Địa chỉ máy chủ MoMo
            path: '/v2/gateway/api/create', // Đường dẫn API để tạo thanh toán
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody)
            }
        };

        // Tạo yêu cầu HTTPS
        const req = https.request(options, res => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', chunk => {
                body += chunk;
            });
            res.on('end', () => {
                try {
                    const response = JSON.parse(body);
                    if (response.resultCode === 0) {
                        resolve({ payUrl: response.payUrl }); // Nếu thành công, trả về URL thanh toán
                    } else {
                        reject(new Error(`Error from MoMo: ${response.localMessage}`)); // Nếu lỗi, trả về thông báo lỗi từ MoMo
                    }
                } catch (e) {
                    reject(new Error('Failed to parse MoMo response')); // Nếu không thể phân tích phản hồi từ MoMo
                }
            });
        });

        // Xử lý lỗi khi gửi yêu cầu
        req.on('error', (e) => {
            reject(e);
        });

        // Gửi body của yêu cầu
        req.write(requestBody);
        req.end();
    });
};
