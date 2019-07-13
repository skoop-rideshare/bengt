# bengt
Backend for Junction Online Hackathon entry 2019.

### structure for using most endpoints

body: { itemContainingNeededInfo }

Example for creating user and login: 

body { user: { email: 'example@test.se', password: 'test' }}


Bengt uses passport.js for auth. auth.required in the endpoint definition means that auth token returned by login or create user is needed in an header.
