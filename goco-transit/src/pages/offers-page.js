import React from 'react';
import DoneIcon from 'material-ui-icons/Done';
import DeleteIcon from 'material-ui-icons/Delete';
import QuestionIcon from 'material-ui-icons/Help';
import PersonIcon from 'material-ui-icons/Person';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Grid from 'material-ui/Grid';
import Badge from 'material-ui/Badge';

// Components
import AddOfferDialog from '../components/add-offer-dialog';
import DeleteOfferDialog from '../components/delete-offer-dialog';

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
      offers: null
    };

    this.state.offers = getUser().offers;
  }

  render() {
    return (
      <div>
        {/* List of offers - items display the number of users who have accepted the ride 
         Generated from an array */}
        <List dense={this.state.dense}>
          {this.state.offers.map((offer) => {
            return (
              <ListItem button disableGutters={this.state.noGutters} divider={this.state.divider}>
                {/* Number of users on the offered ride */}
                <ListItemAvatar>
                  <IconButton disabled={true}>
                    <Badge badgeContent={offer.passengers.length} color="primary">
                      <PersonIcon />
                    </Badge>
                  </IconButton>
                </ListItemAvatar>
                {/* Date of the ride */}
                <ListItemText
                  primary={offer.destination}
                  secondary={this.state.secondary ? offer.date : null}
                />
                <ListItemSecondaryAction>
                  {/* Delete offer button */}
                  <IconButton onClick={() => { this.deleteOfferDialogChild.handleClickOpen(); }} aria-label="Delete">
                    <DeleteIcon />
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
                  <AddIcon />
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