function cleanUpJson(jsonString) {
  try {
    // Parse the input JSON string into a JavaScript object
    const jsonObject = JSON.parse(jsonString);

    // Recursively traverse the object and remove newlines and backslashes
    function cleanUp(obj) {
      for (const key in obj) {
        if (typeof obj[key] === "string") {
          // Replace newlines and backslashes in string values
          obj[key] = obj[key].replace(/[\n\\]/g, "");
          // Split strings in arrays into individual sentences
          if (key === "Changes" || key === "Pros" || key === "Cons") {
            obj[key] = obj[key].split(". ");
          }
        } else if (typeof obj[key] === "object") {
          // If the value is an object, recursively call the function
          cleanUp(obj[key]);
        }
      }
    }

    // Start the recursive process
    cleanUp(jsonObject);

    // Convert the JavaScript object back to a JSON string
    const cleanedJSONString = JSON.stringify(jsonObject);

    return cleanedJSONString;
  } catch (error) {
    // Handle any parsing errors here
    console.error("Error parsing or cleaning JSON:", error);
    return jsonString; // Return the original JSON string if there's an error
  }
}

module.exports = cleanUpJson;

