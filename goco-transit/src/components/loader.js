import React from 'react';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';

/**
 * This component is loaded at the top of tabs when they're loading
 * data from the server. It displays a circular loading symbol
 */
class Loader extends React.Component {

  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              <CircularProgress size={75} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Loader;