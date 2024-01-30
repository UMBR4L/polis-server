# Sprint-1

## 1. Set-Up Development Environment

### Create a new project repository on GitHub

- [x] Create a new repository on your GitHub account.
- [x] Choose a meaningful name for your project.
- [x] Add a brief description of your project.
- [x] Configure the repository as public or private, depending on your preferences.

### Configure your IDE

- [x] Install and set up the Integrated Development Environment (IDE) of your choice for JavaScript/Node.js development. Popular options include Visual Studio Code, WebStorm, or others.
- [x] Configure any extensions or plugins that will enhance your development experience.

### Set up version control

- [x] Initialize Git in your project folder if it's not already initialized.
- [x] Create a .gitignore file to specify which files and directories should be excluded from version control. Common entries include node_modules, build files, and IDE-specific files.
- [x] Make your initial commit to Git with the necessary project files.

### Project structure

- [x] Organize your project directory structure. Common directories include "src" for source code, "public" for static assets, and "docs" for documentation.
- [x] Create any necessary configuration files, such as package.json for Node.js project dependencies.

### Install node_modules

- [x] Once your project repository is set up, and you have a basic project structure in place, you can install node_modules by running `npm install` or `yarn install`. This step is typically done after your project's initial setup.


## 2. **Backend Development - Data Fetching (3 days)**
  - [x] Set up a Node.js and Express.js server.
    - [x] Install Node.js if not already installed.
    - [x] Create a new Node.js project folder.
    - [x] Initialize a Node.js project using `npm init`.
    - [x] Install Express.js as a dependency.
    - [x] Create a `server.js` file as the main entry point.
    - [x] Set up a basic Express server with routing.
  - [ ] Create endpoints to fetch data from the Canadian Parliament's website.
    - [ ] Define routes for bill data retrieval.
    - [ ] Set up route handlers for bill endpoints.
    - [x] Establish communication with the OpenParliament API.
    - [x] Fetch bill data from the API using HTTP requests.
  - [ ] **Subtasks:**
    - [x] Set up Express.js for routing.
      - [ ] Create a `routes` folder for route definitions.
      - [ ] Define route handlers for bill-related endpoints.
      - [ ] Connect route handlers to the Express app.
    - [ ] Research and implement web scraping techniques to extract data.
      - [ ] Explore web scraping libraries for Node.js.
      - [ ] Choose a suitable library or module for web scraping.
      - [ ] Write code to scrape bill data from the website.
      - [ ] Test the web scraping functionality.
