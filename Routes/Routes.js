const express = require("express");

const Router = express.Router();

const RouteHandlers = require("../RouteHandlers/Routehandlers");

Router.route("/getallstudents").get(RouteHandlers.getAllData);
Router.route("/getstudentsByRollNumber/:rollnumber").get(RouteHandlers.getDatabyRoll);
Router.route("/addstudent").post(RouteHandlers.CreateData);
Router.route("/updatestudent/:rollnumber").patch(RouteHandlers.updateData);
Router.route("/deletestudent/:rollnumber").delete(RouteHandlers.DeleteData);

module.exports = Router;
