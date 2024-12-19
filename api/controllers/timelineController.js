import TimelineService from "../services/timelineService.js";

class TimelineController {
  static async getTimelineEventsByProject(req, res) {
    try {
      const timelineEvents = await TimelineService.getTimelineEventsByProject(req.params.id);
      res.status(200).json(timelineEvents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default TimelineController;
