const apiUrlLectures = "http://localhost:9090/lectures";

/**
 * Fetches all lectures from the server.
 * @returns {Promise<Lecture[]>} A list of lectures.
 */
async function fetchLectures() {
  try {
    const response = await fetch(apiUrlLectures);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Vorlesungen erfolgreich abgerufen!");
    return data;
  } catch (err) {
    console.log("Fehler beim Abrufen der Vorlesungen: " + err.message);
    throw err;
  }
}

/**
 * Fetches a single lecture by its ID.
 * @param {number} id The ID of the lecture to fetch.
 * @returns {Promise<Lecture>} The lecture with the specified ID.
 */
async function fetchLecture(id) {
  try {
    const response = await fetch(`${apiUrlLectures}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Vorlesung erfolgreich abgerufen!");
    return data;
  } catch (err) {
    console.log("Fehler beim Abrufen der Vorlesung: " + err.message);
    throw err;
  }
}

/**
 * Saves a lecture to the server.
 * @param {Lecture} lecture The lecture to save.
 * @returns {Promise<Lecture>} The saved lecture.
 */
async function saveLecture(lecture) {
  try {
    const response = await fetch(apiUrlLectures, {
      method: lecture.id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lecture),
    });

    if (!response.ok) {
      throw new Error('Error saving lecture');
    }

    const data = await response.json();
    if (lecture.id) {
      console.log("Vorlesung erfolgreich aktualisiert!");
    } else {
      console.log("Vorlesung erfolgreich erstellt!");
    }
    return data;
  } catch (err) {
    console.log("Fehler beim Speichern der Vorlesung: " + err.message);
    throw err;
  }
}

/**
 * Deletes a lecture by its ID.
 * @param {number} id The ID of the lecture to delete.
 * @returns {Promise<void>}
 */
async function deleteLecture(id) {
  try {
    const response = await fetch(`${apiUrlLectures}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error deleting lecture');
    }

    console.log("Vorlesung erfolgreich gelöscht!");
  } catch (err) {
    console.log("Fehler beim Löschen der Vorlesung: " + err.message);
    throw err;
  }
}

export {
  fetchLectures,
  fetchLecture,
  saveLecture,
  deleteLecture,
};