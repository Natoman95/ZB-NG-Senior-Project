import React from 'react';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Badge from 'material-ui/Badge';

// Components
import AddOfferDialog from '../components/add-offer-dialog';
import DeleteOfferDialog from '../components/delete-offer-dialog';
import {Icons} from '../components/icon-library';

// Services
import { getUser } from '../services/user-service';

// Contains rides offered to other users
class OffersPage extends React.Component {
  constructor() {
    super();

    this.state = {
      dense: false,
      secondary: true,
      noGutters: true,
      divider: true,
      offeredRides: null
    };

    this.state.offeredRides = getUser().offeredRides;
  }

  render() {
    return (
      <div>
        {/* List of ride offers - items display the number of users who have accepted the ride 
         Generated from an array */}
        <List dense={this.state.dense}>
          {this.state.offeredRides.map((offeredRide) => {
            return (
              <ListItem button disableGutters={this.state.noGutters} divider={this.state.divider}>
                {/* Number of users on the offered ride */}
                <ListItemAvatar>
                  <IconButton disabled={true}>
                    <Badge badgeContent={offeredRide.passengers.length + "/" + offeredRide.maxCapacity} color="primary">
                      {Icons.personIcon}
                    </Badge>
                  </IconButton>
                </ListItemAvatar>
                {/* Date of the ride */}
                <ListItemText
                  primary={offeredRide.destination}
                  secondary={this.state.secondary ? offeredRide.date : null}
                />
                <ListItemSecondaryAction>
                  {/* Delete ride offer button */}
                  <IconButton onClick={() => { this.deleteOfferDialogChild.handleClickOpen(); }} aria-label="Delete">
                    {Icons.deleteIcon}
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>

        {/* Add Offer Button */}
        <Grid container>
          <Grid item xs={12}>
            <Grid container direction="row" justify="flex-end" alignItems="center">
              <Grid item>
                <Button variant="fab" color="secondary" aria-label="add" onClick={() => { this.addOfferDialogChild.handleClickOpen(); }}>
                  {Icons.addIcon}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Dialog boxes */}
        <AddOfferDialog ref={(addOfferDialogInstance) => { this.addOfferDialogChild = addOfferDialogInstance; }} />
        <DeleteOfferDialog ref={(deleteOfferDialogInstance) => { this.deleteOfferDialogChild = deleteOfferDialogInstance; }} />

      </div>
    );
  }
}

export default OffersPage;