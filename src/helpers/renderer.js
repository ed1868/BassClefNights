import React from 'react';
import {renderToString} from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {renderRoutes} from 'react-router-config'
import serialize from 'serialize-javascript'
import {JssProvider, SheetsRegistry, ThemeProvider} from 'react-jss'

import theme from '../styles/theme'

export default (req, store, context, routes) => {
    const sheets = new SheetsRegistry();
    let initStore = store.getState();
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <JssProvider registry={sheets}>
                    <ThemeProvider theme={theme}>
                        {renderRoutes(routes)}
                    </ThemeProvider>
                </JssProvider>
            </StaticRouter>
        </Provider>
    );
    return `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="shortcut icon" href="images/logoIcon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
        <link href="https://fonts.googleapis.com/css?family=Cormorant+Garamond:300,400|Montserrat:100,300" rel="stylesheet">
        <style type="text/css" id="server-side-styles">
          ${sheets.toString()}
        </style>
      </head>
      <body>
        <div id="root">${content}</div>
        <script id="initialState">
            window.INITIAL_STATE = ${serialize(initStore)}
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
};
