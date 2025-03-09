const apiUrlLecturers = "http://localhost:9090/lecturers";

/**
 * Fetches all lecturers from the server.
 * @returns {Promise<Lecturer[]>} A list of lecturers.
 */
async function fetchLecturers() {
  try {
    const response = await fetch(apiUrlLecturers);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Dozenten erfolgreich abgerufen!");
    return data;
  } catch (err) {
    console.log("Fehler beim Abrufen der Dozenten: " + err.message);
    throw err;
  }
}

/**
 * Fetches a single lecturer by its ID.
 * @param {number} id The ID of the lecturer to fetch.
 * @returns {Promise<Lecturer>} The lecturer with the specified ID.
 */
async function fetchLecturer(id) {
  try {
    const response = await fetch(`${apiUrlLecturers}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Dozent erfolgreich abgerufen!");
    return data;
  } catch (err) {
    console.log("Fehler beim Abrufen des Dozenten: " + err.message);
    throw err;
  }
}

/**
 * Saves a lecturer to the server.
 * @param {Lecturer} lecturer The lecturer to save.
 * @returns {Promise<Lecturer>} The saved lecturer.
 */
async function saveLecturer(lecturer) {
  try {
    const response = await fetch(apiUrlLecturers, {
      method: lecturer.id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lecturer),
    });

    if (!response.ok) {
      throw new Error('Error saving lecturer');
    }

    const data = await response.json();
    if (lecturer.id) {
      console.log("Dozent erfolgreich aktualisiert!");
    } else {
      console.log("Dozent erfolgreich erstellt!");
    }
    return data;
  } catch (err) {
    console.log("Fehler beim Speichern des Dozenten: " + err.message);
    throw err;
  }
}

/**
 * Deletes a lecturer by its ID.
 * @param {number} id The ID of the lecturer to delete.
 * @returns {Promise<void>}
 */
async function deleteLecturer(id) {
  try {
    const response = await fetch(`${apiUrlLecturers}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error deleting lecturer');
    }

    console.log("Dozent erfolgreich gelöscht!");
  } catch (err) {
    console.log("Fehler beim Löschen des Dozenten: " + err.message);
    throw err;
  }
}

export {
  fetchLecturers,
  fetchLecturer,
  saveLecturer,
  deleteLecturer,
};