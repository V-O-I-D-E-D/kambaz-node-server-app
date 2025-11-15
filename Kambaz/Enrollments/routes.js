import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.get("/api/courses/:courseId/enrollments", (req, res) => {
    const { courseId } = req.params;
    const enrollments = dao.findEnrollmentsForCourse(courseId);
    res.json(enrollments);
  });

  app.get("/api/users/:userId/enrollments", (req, res) => {
    let { userId } = req.params;

    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }

    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  });

  app.post("/api/enrollments", (req, res) => {
    const { userId, courseId } = req.body;
    if (!userId || !courseId) {
      res.status(400).json({ error: "userId and courseId are required" });
      return;
    }

    const enrollment = dao.enrollUserInCourse(userId, courseId);
    if (!enrollment) {
      res.status(409).json({ error: "Already enrolled" });
      return;
    }

    res.json(enrollment);
  });
  app.delete("/api/enrollments/:enrollmentId", (req, res) => {
    const { enrollmentId } = req.params;
    const status = dao.deleteEnrollmentById(enrollmentId);
    res.json(status);
  });

  app.delete("/api/enrollments", (req, res) => {
    const { userId, courseId } = req.body;
    if (!userId || !courseId) {
      res.status(400).json({ error: "userId and courseId are required" });
      return;
    }
    const status = dao.unenrollUserFromCourse(userId, courseId);
    res.json(status);
  });
}