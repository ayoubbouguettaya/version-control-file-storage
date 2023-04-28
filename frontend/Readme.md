# Frontend was scaffolded By Vitejs.

## Structure of the Project

the application has to 2 pages:
* The Home Page   `/`
* The changes Page `/show/:commitHash`

the HomePage is composed from :

- AuthenticatedUserPanel: this component is displaying the current authenticated user as a string and a form that allow us to change the authenticated user (which is just mocking move we are not handling any real authentication)



- HistoricPanel: this component display the history of commits , eash commit has an author ,a message, timestamps and a unique Hash. for each commit item there is a possibiliy to show the details of the commit by ppresing on the "show" button which will redirect the user to `/show/:hash-commit` 


- Editor Panel: this component allow us to edit the content of the file in a sofisticated matter taking into consideration YAML format.thanks to '@monaco-editor/react' for the awesome Editor



the changes Page  `/show/:commitHash`:
using this library 'react-diff-view' we had easly displayed a nice looking Diff view to show the changes that was introduce by a given commit. parsing some data that was originated from "Git show" which produce a certain Diff format.  