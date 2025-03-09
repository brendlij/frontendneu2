const apiUrlStudyPrograms = "http://localhost:9090/studyprograms";

/**
 * Fetches all study programs from the server.
 * @returns {Promise<StudyProgram[]>} A list of study programs.
 */
async function fetchStudyPrograms() {
  const response = await fetch(apiUrlStudyPrograms);
  if (!response.ok) {
    throw new Error(`HTTP error: The status is ${response.status}`);
  }
  return await response.json();
}

/**
 * Fetches a single study program by its ID.
 * @param {number} id The ID of the study program to fetch.
 * @returns {Promise<StudyProgram>} The study program with the specified ID.
 */
async function fetchStudyProgram(id) {
  const response = await fetch(`${apiUrlStudyPrograms}/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error: The status is ${response.status}`);
  }
  return await response.json();
}

/**
 * Saves a study program to the server.
 * @param {StudyProgram} studyProgram The study program to save.
 * @returns {Promise<StudyProgram>} The saved study program.
 */
async function saveStudyProgram(studyProgram) {
  try {
    const url = studyProgram.id
      ? `${apiUrlStudyPrograms}/${studyProgram.id}`
      : apiUrlStudyPrograms;
    const method = studyProgram.id ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studyProgram),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response as JSON
    const savedStudyProgram = await response.json();

    // Ensure the response contains an ID
    if (!savedStudyProgram || !savedStudyProgram.id) {
      throw new Error(
        "Invalid response from server: Study program ID is missing."
      );
    }

    return savedStudyProgram;
  } catch (error) {
    console.error("Error saving study program:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

/**
 * Deletes a study program by its ID.
 * @param {number} id The ID of the study program to delete.
 * @returns {Promise<void>}
 */
async function deleteStudyProgram(id) {
  const response = await fetch(`${apiUrlStudyPrograms}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error deleting study program");
  }
}

/**
 * Fetches all lectures from the server.
 * @returns {Promise<Lecture[]>} A list of lectures.
 */
async function fetchLectures() {
  const response = await fetch("http://localhost:9090/lectures");
  if (!response.ok) {
    throw new Error(`HTTP error: The status is ${response.status}`);
  }
  return await response.json();
}

/**
 * Fetches all lecturers from the server.
 * @returns {Promise<Lecturer[]>} A list of lecturers.
 */
async function fetchLecturers() {
  const response = await fetch("http://localhost:9090/lecturers");
  if (!response.ok) {
    throw new Error(`HTTP error: The status is ${response.status}`);
  }
  return await response.json();
}

/**
 * Adds a lecture to a study program.
 * @param {number} studyProgramId The ID of the study program.
 * @param {number} lectureId The ID of the lecture to add.
 * @returns {Promise<void>}
 */
async function addLectureToStudyProgram(studyProgramId, lectureId) {
  const response = await fetch(
    `${apiUrlStudyPrograms}/${studyProgramId}/lectures/${lectureId}`,
    {
      method: "POST",
    }
  );
  if (!response.ok) {
    throw new Error("Error adding lecture to study program");
  }
}

/**
 * Adds a lecturer to a study program.
 * @param {number} studyProgramId The ID of the study program.
 * @param {number} lecturerId The ID of the lecturer to add.
 * @returns {Promise<void>}
 */
async function addLecturerToStudyProgram(studyProgramId, lecturerId) {
  const response = await fetch(
    `${apiUrlStudyPrograms}/${studyProgramId}/lecturers/${lecturerId}`,
    {
      method: "POST",
    }
  );
  if (!response.ok) {
    throw new Error("Error adding lecturer to study program");
  }
}

/**
 * Removes a lecture from a study program.
 * @param {number} studyProgramId The ID of the study program.
 * @param {number} lectureId The ID of the lecture to remove.
 * @returns {Promise<void>}
 */
async function removeLectureFromStudyProgram(studyProgramId, lectureId) {
  const response = await fetch(
    `${apiUrlStudyPrograms}/${studyProgramId}/lectures/${lectureId}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("Error removing lecture from study program");
  }
}

/**
 * Removes a lecturer from a study program.
 * @param {number} studyProgramId The ID of the study program.
 * @param {number} lecturerId The ID of the lecturer to remove.
 * @returns {Promise<void>}
 */
async function removeLecturerFromStudyProgram(studyProgramId, lecturerId) {
  const response = await fetch(
    `${apiUrlStudyPrograms}/${studyProgramId}/lecturers/${lecturerId}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("Error removing lecturer from study program");
  }
}

// Export all functions
export {
  fetchStudyPrograms,
  fetchStudyProgram,
  saveStudyProgram,
  deleteStudyProgram,
  fetchLectures,
  fetchLecturers,
  addLectureToStudyProgram,
  addLecturerToStudyProgram,
  removeLectureFromStudyProgram,
  removeLecturerFromStudyProgram,
};
