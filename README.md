# Folder structure
can check this video in the advanced section for more details: https://www.youtube.com/watch?v=UUga4-z7b6s&ab_channel=WebDevSimplified


- src/assets
- src/components: this will hold the global components that is used everywhere (ex: Button Component, etc)
- src/context: holds contexts (something like a global variable)
- src/data: storage for json files and constants
- src/features: this will hold the main features that will be requried (ex: authentication)
    - it will act like a mini project that holds a feature 
- src/hooks
- src/layouts: for components that deal with layouts like NavBar, Footer, and Sidebars
- src/lib: 3rd party libraries should be here for easier updates (for facade pattern)
- src/pages: files for each page (ex: Home.jsx, Login.jsx, Signup.jsx)
- src/services: all services that is integerating for apis
- src/utils: the utility functions can be placed here, simple codes and simple functions (ex: formatDate)