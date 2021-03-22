import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BookCabForm from './BookCab'

const App = () => (
  <MuiThemeProvider>
    <BookCabForm />
  </MuiThemeProvider> 
);

export default App;
