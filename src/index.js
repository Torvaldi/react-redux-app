import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

// Material design IU custom color
// https://material-ui.com/customization/color/
import { createMuiTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import blue from '@material-ui/core/colors/blue';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
           main: '#3f51b5',
        },
        secondary: {
            main: '#7e57c2',
      },
    }
});

ReactDOM.render((
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </ThemeProvider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
