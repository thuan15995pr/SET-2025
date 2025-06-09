// const express = require('express');
// const app = express();
// const port = 3000;

// app.use(express.json());

// let sumCallCount = 0;

// app.post('/sum', (req, res) => {
//   const { num1, num2 } = req.body;

//   if (typeof num1 !== 'number' || typeof num2 !== 'number') {
//     return res.status(400).send('Cả num1 và num2 phải là số');
//   }

//   const sum = num1 + num2;
//   sumCallCount++;

//   res.send({ sum });
// });

// app.get('/count-sum', (req, res) => {

//   res.send({ count: sumCallCount });
// });

// app.listen(port, () => {
//   console.log(`Server đang chạy tại http://localhost:${port}`);
// });

const http = require('http');

const port = 3000;
let sumCallCount = 0;
let history = []; 


function isValidJSON(str) {
    if (typeof str !== 'string') return false;
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');


    if (req.url === '/sum' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
     
            if (!isValidJSON(body)) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'JSON không hợp lệ' }));
                return;
            }


            const data = JSON.parse(body);
            const num1 = data.num1;
            const num2 = data.num2;

   
            if (typeof num1 !== 'number' || typeof num2 !== 'number') {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Cả num1 và num2 phải là số' }));
                return;
            }

    
            const sum = num1 + num2;
            sumCallCount++;
            const response = { sum };
            history.push({
                endpoint: "/sum",
                input: { num1, num2 },
                output: response
            });


            res.statusCode = 200;
            res.end(JSON.stringify(response));
        });
    }

    else if (req.url === '/count-sum' && req.method === 'GET') {
        const response = { totalCall: sumCallCount };
        history.push({
            endpoint: "/count-sum",
            input: {},
            output: response
        });
        res.statusCode = 200;
        res.end(JSON.stringify(response));
    }

    else if (req.url === '/current-time' && req.method === 'GET') {
        const now = new Date();
        const year = now.getUTCFullYear();
        const month = String(now.getUTCMonth() + 1).padStart(2, '0');
        const day = String(now.getUTCDate()).padStart(2, '0');
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');
        const currentTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
        const response = { currentTime };
        history.push({
            endpoint: "/current-time",
            input: {},
            output: response
        });
        res.statusCode = 200;
        res.end(JSON.stringify(response));
    }

    else if (req.url === '/history' && req.method === 'GET') {
        const response = { history: history };
        res.statusCode = 200;
        res.end(JSON.stringify(response));

        history.push({
            endpoint: "/history",
            input: {},
            output: response
        });
    }

    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Không tìm thấy' }));
    }
});

server.listen(port, () => {
    console.log(`Máy chủ đang chạy tại http://localhost:${port}`);
});

console.log("Dyu Mai co Vai Gay~");

