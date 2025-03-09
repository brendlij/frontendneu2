const apiUrlSemesters = "http://localhost:9090/semesters";

/**
 * Fetches all semesters from the server.
 * @returns {Promise<Semester[]>} A list of semesters.
 */
async function fetchSemesters() {
  try {
    const response = await fetch(apiUrlSemesters);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Semester erfolgreich abgerufen!");
    return data;
  } catch (err) {
    console.log("Fehler beim Abrufen der Semester: " + err.message);
    throw err;
  }
}

/**
 * Fetches a single semester by its ID.
 * @param {number} id The ID of the semester to fetch.
 * @returns {Promise<Semester>} The semester with the specified ID.
 */
async function fetchSemester(id) {
  try {
    const response = await fetch(`${apiUrlSemesters}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Semester erfolgreich abgerufen!");
    return data;
  } catch (err) {
    console.log("Fehler beim Abrufen des Semesters: " + err.message);
    throw err;
  }
}

/**
 * Saves a semester to the server.
 * @param {Semester} semester The semester to save.
 * @returns {Promise<Semester>} The saved semester.
 */
async function saveSemester(semester) {
  try {
    const response = await fetch(apiUrlSemesters, {
      method: semester.id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(semester),
    });

    if (!response.ok) {
      throw new Error('Error saving semester');
    }

    const data = await response.json();
    if (semester.id) {
      console.log("Semester erfolgreich aktualisiert!");
    } else {
      console.log("Semester erfolgreich erstellt!");
    }
    return data;
  } catch (err) {
    console.log("Fehler beim Speichern des Semesters: " + err.message);
    throw err;
  }
}

/**
 * Deletes a semester by its ID.
 * @param {number} id The ID of the semester to delete.
 * @returns {Promise<void>}
 */
async function deleteSemester(id) {
  try {
    const response = await fetch(`${apiUrlSemesters}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error deleting semester');
    }

    console.log("Semester erfolgreich gelöscht!");
  } catch (err) {
    console.log("Fehler beim Löschen des Semesters: " + err.message);
    throw err;
  }
}

export {
  fetchSemesters,
  fetchSemester,
  saveSemester,
  deleteSemester,
};