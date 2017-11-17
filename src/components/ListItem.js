import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';

import { CardSection } from './common';
import * as actions from '../actions';

class ListItem extends Component {

  componentWillUpdate () {
    LayoutAnimation.spring();
  }

  selectLibraryItem (libraryId) {
      this.props.selectLibrary(libraryId);
  }

  renderDescription () {
    const { library, expanded } = this.props;
    if (expanded) {
      // text with flex 1 tells it to not go off the screen and instead wrap
      return (
        <CardSection>
          <Text style={{ flex: 1}}>{library.description}</Text>
        </CardSection>
      );
    }
  }

  render () {
    const { library } = this.props;
    const { titleStyle } = styles;
    return (
      <TouchableWithoutFeedback onPress={() => this.selectLibraryItem(library.id)}>
        <View>
          <CardSection>
            <Text style={titleStyle}>
              {library.title}
              </Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }

}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.library.id;
  return { expanded };
};

export default connect(mapStateToProps, actions)(ListItem);