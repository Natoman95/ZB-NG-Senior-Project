import React from 'react';
import TextField from 'material-ui/TextField';

class RequestSearch extends React.Component {

  render() {
    return (
      <div>
        <div style={{ margin: 0 }}>
          <TextField
            id="search"
            label="Find a ride by location"
            type="search"
            margin="normal"
            fullWidth={true}
          />
        </div>

        <div style={{}}>
          <form noValidate>
            <TextField
              id="startDate"
              label="Earliest Travel Day"
              type="date"
              defaultValue="2018-12-31"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default RequestSearch