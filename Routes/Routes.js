const express = require("express");

const Router = express.Router();

const RouteHandlers = require("../RouteHandlers/Routehandlers");
const AuthRouteHandlers = require("../RouteHandlers/AuthRouteHandlers");

Router.route('/registeruser').post(AuthRouteHandlers.RegisterUser)
Router.route('/loginuser').post(AuthRouteHandlers.LoginUser)

Router.route("/getallstudents").get(AuthRouteHandlers.ProtectRoutes,RouteHandlers.getAllData);
Router.route("/getstudentsByRollNumber/:rollnumber").get(AuthRouteHandlers.ProtectRoutes,RouteHandlers.getDatabyRoll);
Router.route("/addstudent").post(AuthRouteHandlers.ProtectRoutes,RouteHandlers.CreateData);
Router.route("/updatestudent/:rollnumber").patch(AuthRouteHandlers.ProtectRoutes,RouteHandlers.updateData);
Router.route("/deletestudent/:rollnumber").delete(AuthRouteHandlers.ProtectRoutes,RouteHandlers.DeleteData);

module.exports = Router;
