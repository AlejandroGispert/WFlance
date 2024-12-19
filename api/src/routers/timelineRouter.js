import express from "express";
import TimelineController from "../../controllers/timelineController.js";

const timelineRouter = express.Router();

timelineRouter.get("/:id/timeline", TimelineController.getTimelineEventsByProject);

export default timelineRouter;
