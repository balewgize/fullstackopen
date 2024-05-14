```mermaid

sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document (previous notes + form to create a new note)
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that and handles form submit and list of initial notes fetched from the server

    Note right of browser: User types some content in the form and clicks on the "Save" button

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server using AJAX request

    Note right of browser: The browser updates list of notes and sends the form data to the server

    server-->>browser: New note created message
    deactivate server

    Note right of browser: Upon getting success message, updated list of notes will be displayed with refreshing the page
```
