# User Story — GiftLink
## User Story
**As a user, I want to browse and search for available household items so that I can find useful items that are being given away for free instead of purchasing new ones.**
## Details and Assumptions
- GiftLink allows users to find household items that other users no longer need.
- Users can view a list of available items.
- Each item contains information such as title, description, category, location, condition, and image.
- Users can search for items using keywords.
- Users can open an item to view its complete details.
- Users must register and log in to access protected user features.
- The application uses MongoDB to store item and user information.
- The backend API is implemented using Node.js and Express.
- The frontend provides a user-friendly interface for browsing and searching items.
## Acceptance Criteria
### Scenario 1: Browse available items
**Given** that the GiftLink application is running
**When** a user opens the items page
**Then** the application should display the available household items.
### Scenario 2: View item information
**Given** that available items are displayed
**When** the user selects an item
**Then** the application should display the item's title, description, category, location, condition, and image.
### Scenario 3: Search for an item
**Given** that the user is on the item search page
**When** the user enters a valid keyword such as "Table"
**Then** the application should display items that match the search criteria.
### Scenario 4: No matching items
**Given** that the user searches for an item
**When** no item matches the search keyword
**Then** the application should indicate that no matching items were found.
### Scenario 5: User registration
**Given** that the user does not have an account
**When** the user submits a valid name, email, and password
**Then** the application should create a new user account and return a successful registration response.
### Scenario 6: User login
**Given** that the user has a registered account
**When** the user submits valid login credentials
**Then** the application should authenticate the user and return a valid authentication token.
### Scenario 7: Invalid login
**Given** that the user has entered incorrect login credentials
**When** the user attempts to log in
**Then** the application should reject the login attempt and return an appropriate error message.
### Scenario 8: Item details
**Given** that an item exists in GiftLink
**When** the user requests the item's details using its ID
**Then** the application should return the correct item information.
## Defnition of Done
- The user story follows the required format.
- Details and assumptions are documented.
- Acceptance criteria are written using **Given, When, Then** Gherkin syntax.
- The functionality is implemented and tested through the GiftLink API.
- The completed user story is stored in `docs/user-story.md`.
