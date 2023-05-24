const Run = require("../models/Run");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllRuns = async (req, res) => {
  const runs = await Run.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ runs, count: runs.length });
};

const getRun = async (req, res) => {
  const {
    user: { userId },
    params: { id: runId },
  } = req;

  const run = await Run.find({ createdBy: userId, _id: runId });
  if (!run) {
    throw new NotFoundError(`No run with id ${runId} found`);
  }
  res.status(StatusCodes.OK).json({ run });
};

const createRun = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const run = await Run.create(req.body);
  res.status(StatusCodes.CREATED).json(run);
};

const updateRun = async (req, res) => {
  const {
    body: { location, distance },
    user: { userId },
    params: { id: runId },
  } = req;

  if (!location || !distance) {
    throw new BadRequestError("Location and distance cannot be empty");
  }

  const run = await Run.findOneAndUpdate(
    { createdBy: userId, _id: runId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!run) {
    throw new NotFoundError(`No run with id ${runId} found`);
  }
  res.status(StatusCodes.OK).json({ run });
};

const deleteRun = async (req, res) => {
  const {
    user: { userId },
    params: { id: runId },
  } = req;

  const run = await Run.findOneAndRemove({ _id: runId, createdBy: userId });
  if (!run) {
    throw new BadRequestError(`No run with id ${runId} found`);
  }

  res.status(StatusCodes.ACCEPTED).send();
};

module.exports = { getAllRuns, getRun, createRun, updateRun, deleteRun };
