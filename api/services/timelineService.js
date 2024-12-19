import TimelineEvents from "../models/timelineEvents.js";

class TimelineService {
  static async getTimelineEventsByProject(id) {
    try {
      const timelineEvents = await TimelineEvents.findAll({ where: { projectId: id } });

      if (!timelineEvents || timelineEvents.length === 0) {
        return { error: "Timeline events not found" };
      }

      return timelineEvents;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default TimelineService;
