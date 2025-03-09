const apiUrlLectureDates = "http://localhost:9090/lecturedates";

/**
 * Fetches all lecture dates from the server.
 * @returns {Promise<LectureDate[]>} A list of lecture dates.
 */
async function fetchLectureDates() {
  try {
    const response = await fetch(apiUrlLectureDates);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Vorlesungstermine erfolgreich abgerufen!");
    return data;
  } catch (err) {
    console.log("Fehler beim Abrufen der Vorlesungstermine: " + err.message);
    throw err;
  }
}

/**
 * Fetches a single lecture date by its ID.
 * @param {number} id The ID of the lecture date to fetch.
 * @returns {Promise<LectureDate>} The lecture date with the specified ID.
 */
async function fetchLectureDate(id) {
  try {
    const response = await fetch(`${apiUrlLectureDates}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Vorlesungstermin erfolgreich abgerufen!");
    return data;
  } catch (err) {
    console.log("Fehler beim Abrufen des Vorlesungstermins: " + err.message);
    throw err;
  }
}

/**
 * Saves a lecture date to the server.
 * @param {LectureDate} lectureDate The lecture date to save.
 * @returns {Promise<LectureDate>} The saved lecture date.
 */
async function saveLectureDate(lectureDate) {
  try {
    const response = await fetch(apiUrlLectureDates, {
      method: lectureDate.id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lectureDate),
    });

    if (!response.ok) {
      throw new Error('Error saving lecture date');
    }

    const data = await response.json();
    if (lectureDate.id) {
      console.log("Vorlesungstermin erfolgreich aktualisiert!");
    } else {
      console.log("Vorlesungstermin erfolgreich erstellt!");
    }
    return data;
  } catch (err) {
    console.log("Fehler beim Speichern des Vorlesungstermins: " + err.message);
    throw err;
  }
}

/**
 * Deletes a lecture date by its ID.
 * @param {number} id The ID of the lecture date to delete.
 * @returns {Promise<void>}
 */
async function deleteLectureDate(id) {
  try {
    const response = await fetch(`${apiUrlLectureDates}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error deleting lecture date');
    }

    console.log("Vorlesungstermin erfolgreich gelöscht!");
  } catch (err) {
    console.log("Fehler beim Löschen des Vorlesungstermins: " + err.message);
    throw err;
  }
}

export {
  fetchLectureDates,
  fetchLectureDate,
  saveLectureDate,
  deleteLectureDate,
};