const cron = require("node-cron");
const transactionHandler = require('./routes/transaction');

const transactionTask = cron.schedule(
    "*/5 * * * * *", // 30초에 한번씩 실행
    transactionHandler,
    {
        scheduled: true,
    }
);


transactionTask.start();
