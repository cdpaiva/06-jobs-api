const Run = require("../models/Run");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllRuns = async (req, res) => {
  res.send("list of all runs");
};

const getRun = async (req, res) => {
  res.send("gets a single run");
};

const createRun = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const run = await Run.create(req.body);
  res.status(StatusCodes.CREATED).json(run);
};

const updateRun = async (req, res) => {
  res.send("updated run");
};

const deleteRun = async (req, res) => {
  res.send("removed a run");
};

module.exports = { getAllRuns, getRun, createRun, updateRun, deleteRun };
