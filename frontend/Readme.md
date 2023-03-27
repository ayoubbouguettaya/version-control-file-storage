# Frontend

this Project was scaffolded By Vitejs.

## Structure of the Project

the project has one page : HOMEComponent

the HomePage is composed from Main Component:

- AuthenticatedUserPanel: this component simulates or replaces the authentication mechanism because it's more convenient to focus on the purpose of this blog post. we represent the currently authenticated user By a username: string which can be updated on the input UI.

- HistoricPanel: this component fetch the commit history of the file from the backend and display it in a user-friendly manner. we didn't implement pagination (same reason as the auth mechanism to keep the app tiny as much as possible and focus on the topic).on each commit item on the history there is a "Show button" this trigger a request to the backend to get the changes occurred on that commit and we display it on Modal in Git Diff Style.

- FormPanel: this is the UI that allows the User to add New Field and submit the changes with the ability to attach a comment to that particular change.
