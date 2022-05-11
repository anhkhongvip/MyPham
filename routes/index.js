const homeRouter = require("./home");
const authRouter = require("./auth");
const apiRouter = require("./api");
const adminRouter = require("./admin");

function route(app) {

    //home
    app.use("/", homeRouter);

    //auth
    app.use("/auth", authRouter)

    //api
    app.use("/api", apiRouter)

    //admin
    app.use("/admin", adminRouter)
}

module.exports = route;