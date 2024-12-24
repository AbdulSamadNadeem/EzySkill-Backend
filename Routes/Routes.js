const express = require("express");

const Router = express.Router();

const RouteHandlers = require("../RouteHandlers/Routehandlers");

Router.route("/getallstudents").get(RouteHandlers.getAllData);
Router.route("/getstudentsByRollNumber/:roll").get(RouteHandlers.getDatabyRoll);
Router.route("/addstudent").post(RouteHandlers.CreateData);
Router.route("/updatestudent/:roll").patch(RouteHandlers.updateData);
Router.route("/deletestudent/:roll").delete(RouteHandlers.DeleteData);

module.exports = Router;
