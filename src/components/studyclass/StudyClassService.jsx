const apiUrlStudyClasses = "http://localhost:9090/studyclasss";

/**
 * Fetches all study classes from the server.
 * @returns {Promise<StudyClass[]>} A list of study classes.
 */
async function fetchStudyClasses() {
  try {
    const response = await fetch(apiUrlStudyClasses);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("StudyClasses erfolgreich abgerufen!");
    return data;
  } catch (err) {
    console.log("Fehler beim Abrufen der StudyClasses: " + err.message);
    throw err;
  }
}

/**
 * Fetches a single study class by its ID.
 * @param {number} id The ID of the study class to fetch.
 * @returns {Promise<StudyClass>} The study class with the specified ID.
 */
async function fetchStudyClass(id) {
  try {
    const response = await fetch(`${apiUrlStudyClasses}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("StudyClass erfolgreich abgerufen!");
    return data;
  } catch (err) {
    console.log("Fehler beim Abrufen der StudyClass: " + err.message);
    throw err;
  }
}

/**
 * Saves a study class to the server.
 * @param {StudyClass} studyClass The study class to save.
 * @returns {Promise<StudyClass>} The saved study class.
 */
async function saveStudyClass(studyClass) {
  try {
    const response = await fetch(apiUrlStudyClasses, {
      method: studyClass.id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studyClass),
    });

    if (!response.ok) {
      throw new Error('Error saving study class');
    }

    const data = await response.json();
    if (studyClass.id) {
      console.log("StudyClass erfolgreich aktualisiert!");
    } else {
      console.log("StudyClass erfolgreich erstellt!");
    }
    return data;
  } catch (err) {
    console.log("Fehler beim Speichern der StudyClass: " + err.message);
    throw err;
  }
}

/**
 * Deletes a study class by its ID.
 * @param {number} id The ID of the study class to delete.
 * @returns {Promise<void>}
 */
async function deleteStudyClass(id) {
  try {
    const response = await fetch(`${apiUrlStudyClasses}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error deleting study class');
    }

    console.log("StudyClass erfolgreich gelöscht!");
  } catch (err) {
    console.log("Fehler beim Löschen der StudyClass: " + err.message);
    throw err;
  }
}

export {
  fetchStudyClasses,
  fetchStudyClass,
  saveStudyClass,
  deleteStudyClass,
};