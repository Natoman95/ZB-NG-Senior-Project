import React from 'react';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemText,
} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Badge from 'material-ui/Badge';

// Components
import OfferDetailsDialog from '../components/offer-details-dialog';
import AddOfferDialog from '../components/add-offer-dialog';
import { Icons } from '../icon-library';

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
      user: null,
      offeredRides: null
    };
  }

  componentWillMount() {
    this.loadUserData();
  }

  render() {
    return (
      <div>
        {this.state.user !== null && <div>
          {/* List of ride offers - items display the number of users who have accepted the ride 
         Generated from an array */}
          <List dense={this.state.dense}>
            {this.state.offeredRides.map((offeredRide) => {              
              return (
                <ListItem
                  button
                  onClick={() => { this.offerDetailsDialogChild.handleClickOpen(offeredRide); }}
                  disableGutters={this.state.noGutters}
                  divider={this.state.divider}
                >
                  {/* Number of users on the offered ride */}
                  <ListItemAvatar>
                    <IconButton disabled={true}>
                      <Badge badgeContent={offeredRide.passengers.length + "/" + offeredRide.maxCapacity} color="primary">
                        {Icons.seatIcon}
                      </Badge>
                    </IconButton>
                  </ListItemAvatar>
                  {/* Date of the ride */}
                  <ListItemText
                    primary={offeredRide.destination}
                    secondary={this.state.secondary ? offeredRide.date : null}
                  />
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

        </div>}

        {/* Dialog boxes */}
        <OfferDetailsDialog ref={(offerDetailsDialogInstance) => { this.offerDetailsDialogChild = offerDetailsDialogInstance; }} />
        <AddOfferDialog ref={(addOfferDialogInstance) => { this.addOfferDialogChild = addOfferDialogInstance; }} />
      
      </div>
    );
  }

  /**
   * Load user data - grabbing from 360
   */
  async loadUserData() {
    let data = await getUser();
    this.setState({
      user: data,
      offeredRides: data.offeredRides,
    });
  };

}

export default OffersPage;