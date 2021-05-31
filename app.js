require("dotenv").config();
const Express = require('express');
const app = Express();
const dbConnection = require("./db");

app.use(Express.json());

const controllers = require("./controllers");

app.use("/user", controllers.userController);
app.use("/log", controllers.blogController);


dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() => {
    app.listen(3005, () => {
        console.log(`[Server]: App is listening on 3005.`);
    });
})
.catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
});


app.use('/test', (req, res) => {
    res.send('This is a message from the test endpoint on the server!');
});

// app.listen(3005, () => {
//     console.log(`[Server]: App is listening on 3005.`);
// });