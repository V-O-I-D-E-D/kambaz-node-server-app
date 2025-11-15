import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";

export default function CourseRoutes(app) {
  const findAllCourses = (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  };

  const deleteCourse = (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.send(status);
  };

  const updateCourse = (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const updated = dao.updateCourse(courseId, courseUpdates);
    if (!updated) {
      res.sendStatus(404);
      return;
    }
    res.send(updated);
  };
  
  const findModulesForCourse = (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);
    res.send(modules);
  };
  
  const createModuleForCourse = (req, res) => {
    const { courseId } = req.params;
    const module = {
        ...req.body,
        course: courseId,
    };
    const newModule = modulesDao.createModule(module);
    res.send(newModule);
  };
  
  const findAssignmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const assignments = assignmentsDao.findAssignmentsForCourse(courseId);
    res.send(assignments);
  };
  
  const createAssignmentForCourse = (req, res) => {
    const { courseId } = req.params;
    const assignment = {
        ...req.body,
        course: courseId,
    };
    const newAssignment = assignmentsDao.createAssignment(assignment);
    res.send(newAssignment);
  };

  app.get("/api/courses", findAllCourses);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
}