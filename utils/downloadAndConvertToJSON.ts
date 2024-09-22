import fs from "fs";
import https from "https";
import Papa from "papaparse";
// Function to download and parse CSV, then save as JSON
const downloadAndConvertToJSON = (csvUrl: string, jsonFilePath: string) => {
  https
    .get(csvUrl, (response) => {
      let csvData = "";

      // Get the data from response
      response.on("data", (chunk) => {
        csvData += chunk;
      });

      //When response finish parse it to Json
      response.on("end", () => {
        // Parse the CSV data using PapaParse
        Papa.parse(csvData, {
          header: true,
          complete: (result: { data: unknown }) => {
            // Convert the result into JSON
            const jsonData = JSON.stringify(result.data, null, 2);

            // Write the JSON data to a file
            fs.writeFile(jsonFilePath, jsonData, (err) => {
              if (err) {
                console.error("Error saving JSON file:", err);
              } else {
                console.log("Download and conversion to JSON completed.");
              }
            });
          },
          error: (err: unknown) => {
            console.error("Error parsing CSV:", err);
          },
        });
      });
    })
    .on("error", (err) => {
      console.error("Error fetching CSV file:", err);
    });
};

export default downloadAndConvertToJSON;
