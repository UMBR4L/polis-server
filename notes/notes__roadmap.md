# Roadmap

**Sprint 1: January 24 - [ ] January 31, 2024 (1 week)**

- [x] **Set Up Development Environment (1 day)**

  - [x] Create a new project repository on a platform like GitHub.
  - [x] Configure your IDE, version control, and project structure.

- [x] **Backend Development - Data Fetching (3 days)**

  - [x] Set up a Node.js and Express.js server.
  - [x] Create endpoints to fetch data from the Canadian Parliament's website.
  - [x] Subtasks:
    - [x] Initialize a Node.js project.
    - [x] Set up Express.js for routing.

- [ ] **Initial UI Implementation (3 days)**
  - [x] Design the basic user interface for listing active bills.
    - [x] Create wireframes or mockups for the bill listing component.
    - [x] Define the visual style and layout of the component.
  - [ ] Implement the bill listing component.
    - [ ] Display bill data retrieved from the backend.
    - [ ] Ensure responsive design for various screen sizes.
  - [ ] Set up navigation for accessing bill details.
  - [ ] Integrate basic user interactions (e.g., click events).

**Sprint 2: February 1 - [ ] February 4, 2024 (4 days)**

- [ ] **GPT Integration (2 days)**
  - [ ] Integrate your custom GPT model for generating simple-English descriptions of bills.
    - [ ] Set up a dedicated GPT server or API.
    - [ ] Implement a communication layer between the frontend and the GPT server.
  - [ ] Test GPT integration with sample bill descriptions.
  - [ ] Handle GPT-generated descriptions in the UI.
    - [ ] Update the bill details component to display GPT-enhanced descriptions.

- [ ] **Enhance Bill Details Page (2 days)**
  - [ ] Improve the bill details page with descriptions, purposes, consequences, and latest votes.
  - [ ] Create wireframes or mockups for the enhanced bill details page.
  - [ ] Implement the bill details component.
    - [ ] Retrieve and display detailed bill information, including GPT-generated descriptions.
  - [ ] Enhance user interactions on the bill details page.
  - [ ] Ensure that voting status and progress information is included.

**Sprint 3: February 5 - [ ] February 7, 2024 (3 days)**

- [ ] **User Profile and Location-Based Access (1 day)**

  - [ ] Implement user profiles, allowing users to specify their location.
  - [ ] Enable access to government representatives' voting records.
  - [ ] Subtasks:
    - [ ] Create user profile components.
    - [ ] Implement location selection functionality.
    - [ ] Develop user data storage mechanisms (e.g., JSON storage).

- [ ] **Discussion Forums (Nice-to-Have) (1 day)**

  - [ ] If time permits, add discussion forums for each bill to promote user engagement and democratic discussions.
  - [ ] Subtasks:
    - [ ] Design the forum interface.
    - [ ] Implement posting and commenting functionality.

- [ ] **Final Testing and Bug Fixes (1 day)**
  - [ ] Conduct thorough testing of GPT integration and enhanced bill details.
  - [ ] Verify that GPT-generated descriptions are accurate and helpful.
  - [ ] Address any issues or discrepancies in the bill details page.

## Endpoints

1. **Get List of Active Bills**

   - **Endpoint**: /api/bills
   - **Method**: GET
   - **Parameters**: None
   - **Description**: Retrieves a list of active bills currently in the Canadian Parliament.
   - **Example Response**:

     ```json
     [
       {
         "billID": "C-123",
         "title": "Environmental Protection Act Amendment"
         "sessionID": "33-1"

       },
       {
         "billID": "C-124",
         "title": "Healthcare Reform Bill"
         "sessionID": "33-1"
       }
     ]
     ```

2. **Get Bill Details**

   - **Endpoint**: /api/bills/{billNumber}
   - **Method**: GET
   - **Parameters**: {billNumber}: The unique identifier of the bill to retrieve details for.
   - **Description**: Provides detailed information about a specific bill, including its description, purpose, consequences, and latest votes.
   - **Example Response**:
     ```json
     {
       "billNumber": "C-123",
       "title": "Environmental Protection Act Amendment",
       "status": "In Progress",
       "law": true,
       "introduced": "2001-02-05",
       "legisinfo_url": "https://www.parl.ca/legisinfo/en/bill/9998"
     }
     ```

<!-- 3. **Get Bill Description**

   - **Endpoint**: /api/bills/{billNumber}/description
   - **Method**: GET
   - **Parameters**: {billNumber}: The unique identifier of the bill to retrieve the description for.
   - **Description**: Generates a simplified, easy-to-understand description of a specific bill using the custom GPT model.
   - **Example Response**:
     ```json
     {
       "billNumber": "C-123",
       "title": "Environmental Protection Act Amendment",
       "description": "This bill aims to reduce carbon emissions to combat climate change."
     }
     ```

4. **Get Bill Votes**
   - **Endpoint**: /api/bills/{billNumber}/votes
   - **Method**: GET
   - **Parameters**: {billNumber}: The unique identifier of the bill to retrieve votes for.
   - **Description**: Provides information on the latest votes for a specific bill, including the vote date, result, and voting statistics.
   - **Example Response**:
     ```json
     {
       "billNumber": "C-123",
       "title": "Environmental Protection Act Amendment",
       "latestVotes": [
         {
           "voteDate": "2024-03-15",
           "result": "Passed",
           "votingMembers": 250,
           "votesInFavor": 200,
           "votesAgainst": 50,
           "abstentions": 0
         }
       ]
     } -->

     ```

## Nice-to-Haves

Your project will be marked based on what you committed to in the above document. Under nice-to-haves, you can list any additional features you may complete if you have extra time, or after finishing.

- [ ] **User Authentication**: Implement user authentication and profile creation functionality.
- [ ] **Location-Based Services**: Allow users to specify their location for access to government representatives' voting records.
- [ ] **Discussion Forums**: Implement discussion forums for each bill to promote democratic discussions.
