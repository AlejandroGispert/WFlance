import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Project from "./projects.js";

class TimelineEvents extends Model {}

TimelineEvents.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      field: "project_id",
      references: {
        model: "projects",
        key: "id",
      },
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    eventDate: {
      type: DataTypes.DATEONLY,
      field: "event_date",
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "TimelineEvent",
    tableName: "timeline_events",
    schema: "public",
    timestamps: false,
    defaultScope: {
      include: [
        {
          model: Project,
          as: "project",
          attributes: ["title"],
        },
      ],
    },
    underscored: true,
  }
);

TimelineEvents.belongsTo(Project, { foreignKey: "project_id", as: "project" });

export default TimelineEvents;
