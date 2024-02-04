/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { fetchBillsFromAPI } = require("../src/utils/axios-calls.js"); // Adjust the path as needed

exports.seed = async function (knex) {
  try {
    // Deletes ALL existing entries
    await knex("bills").del();

    // Define the filterName based on your criteria
    const filterName = "introducedAfter2020"; // Change this to your desired filter

    // Fetch data from the API using the specified filter
    const fetchedData = await fetchBillsFromAPI(filterName);
    fetchedData.sort((a, b) => new Date(b.introduced) - new Date(a.introduced));

    // Insert the fetched data into your database table
    await knex("bills").insert(fetchedData);
  } catch (error) {
    console.error(error);
  }
};
