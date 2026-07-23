import {
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

/**
 * Convert place names to a consistent format.
 * Examples:
 *  " hubLI " -> "Hubli"
 *  "shivamogga" -> "Shivamogga"
 */
export function normalizePlace(place) {
  return place
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .split(" ")
    .map(
      word =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}

/**
 * Load all places from Firestore.
 */
export async function loadPlaces() {
  try {

    const snapshot = await getDocs(
      collection(db, "places")
    );

    return snapshot.docs
      .map(doc => doc.data().name)
      .filter(Boolean)
      .sort((a, b) =>
        a.localeCompare(b)
      );

  } catch (error) {

    console.error(
      "Error loading places:",
      error
    );

    return [];
  }
}

/**
 * Save a place if it doesn't already exist.
 */
export async function savePlace(placeName) {

  if (!placeName) return;

  const cleanPlace =
    normalizePlace(placeName);

  try {

    await setDoc(
      doc(
        db,
        "places",
        cleanPlace.toLowerCase()
      ),
      {
        name: cleanPlace,
      },
      {
        merge: true,
      }
    );

  } catch (error) {

    console.error(
      "Error saving place:",
      error
    );

  }

}

/**
 * Get the final place selected by the user.
 * Returns either the selected place or the custom place.
 */
export function getFinalPlace(form) {

  if (form.place === "OTHER") {
    return normalizePlace(
      form.customPlace
    );
  }

  return normalizePlace(form.place);
}