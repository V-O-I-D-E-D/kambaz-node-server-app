import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findEnrollmentsForCourse(courseId) {
  return Database.enrollments.filter((e) => e.course === courseId);
}

export function findEnrollmentsForUser(userId) {
  return Database.enrollments.filter((e) => e.user === userId);
}

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;

  const already = enrollments.some(
    (e) => e.user === userId && e.course === courseId
  );
  if (already) {
    return null;
  }

  const enrollment = {
    _id: uuidv4(),
    user: userId,
    course: courseId,
  };

  enrollments.push(enrollment);
  return enrollment;
}

export function unenrollUserFromCourse(userId, courseId) {
  const { enrollments } = Database;
  const before = enrollments.length;

  Database.enrollments = enrollments.filter(
    (e) => !(e.user === userId && e.course === courseId)
  );

  const after = Database.enrollments.length;
  return { deletedCount: before - after };
}

export function deleteEnrollmentById(enrollmentId) {
  const { enrollments } = Database;
  const before = enrollments.length;

  Database.enrollments = enrollments.filter((e) => e._id !== enrollmentId);

  const after = Database.enrollments.length;
  return { deletedCount: before - after };
}