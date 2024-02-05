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
          if (key === "Proposed Changes" || key === "Pros" || key === "Cons") {
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

//   // Example JSON string with newlines and backslashes
//   const jsonWithNewlinesAndBackslashes = `{
//     \"Intent\": \"The intent of bill S-2 is to amend the Parliament of Canada Act and make consequential and related amendments to other Acts.\",
//     \"Proposed Changes\": [
//       \"Amendments to the Parliament of Canada Act to address various aspects of parliamentary operations and procedures.\",
//       \"Consequential and related amendments to other Acts to ensure consistency and alignment with the changes proposed in the bill.\"
//     ],
//     \"Pros\": [
//       \"Enhancing the efficiency and effectiveness of parliamentary operations.\",
//       \"Improving transparency and accountability in parliamentary procedures.\",
//       \"Modernizing and updating legislative frameworks to better reflect current practices and needs.\",
//       \"Ensuring consistency and alignment across different Acts related to parliamentary functions.\"
//     ],
//     \"Cons\": [
//       \"Potential resistance or opposition from stakeholders who may be affected by the proposed changes.\",
//       \"Challenges in implementing the amendments and ensuring smooth transition to the new legislative provisions.\",
//       \"Possible need for additional resources or training to support the changes introduced by the bill.\"
//     ],
//     \"Progress\": \"Bill S-2 is currently at the early stages of the legislative process and may undergo further readings, debates, and potential amendments before it can be passed into law.\"
//   }`;

//   // Remove newlines and backslashes from the example JSON string
//   const cleanedJSONString = cleanUpJson(
//     jsonWithNewlinesAndBackslashes
//   );

//   console.log(cleanedJSONString);
