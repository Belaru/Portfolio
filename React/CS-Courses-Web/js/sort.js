const compareCourseNumber = makeComparison('number');
const compareCourseCalendar = makeComparison('calendar', compareCourseNumber);
const compareCourseName = makeComparison('name');

/**
 * Returns a comparison function based on the specified property and equality callback.
 * @function makeComparison
 * @param {string} prop - The property to compare.
 * @param {Function} [ifEqual] 
 * - The callback function to handle cases when the properties are equal.
 * @returns {Function} - The comparison function.
 */
function makeComparison(prop, ifEqual) {
  if (!ifEqual) {
    ifEqual = () => 0;
  }
  return (c1, c2) => {
    if (c1[prop] > c2[prop]) {
      return 1;
    }
    if (c1[prop] < c2[prop]) {
      return -1;
    }
    if (c1[prop] === c2[prop]) {
      return ifEqual(c1, c2);
    }
  };
}

/**
   * Represents the comparison function between semesters.
   * @function
   * @param {Object} c1 - The first object to compare.
   * @param {Object} c2 - The second object to compare.
   * @returns {number} - The comparison result.
   */
function getSemesterCourses(courses, semesterObserved) {
  if(semesterObserved === 'none'){
    return courses;
  }
  const coursesOfSemester = courses.filter((course) =>{
    return course.calendar.includes(semesterObserved);
  });
  return coursesOfSemester;
}

export {
  compareCourseNumber,
  compareCourseCalendar,
  compareCourseName,
  getSemesterCourses
};