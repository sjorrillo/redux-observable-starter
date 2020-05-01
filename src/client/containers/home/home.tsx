import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { IApplicationStore } from '../../state/root-store';
import { testAction } from '../../state/stores/ping/ping-action';

interface IStateProps {
  isPinging: boolean;
}

interface IDispatchProps {
  testAction: (recordsPerPage: number) => void;
}

interface IOwnProps {
  isPinging: boolean;
}

class Home extends React.Component<IOwnProps & IStateProps & IDispatchProps, any> {
  handleOnclick = () => {
    const { testAction } = this.props;
    testAction(5);
  };

  render = (
    { isPinging = false }: IOwnProps & IStateProps & IDispatchProps = this.props
  ): JSX.Element => {
    return (
      <div>
        <h1>is pinging: {isPinging.toString()}</h1>
        <button onClick={this.handleOnclick}>Test</button>
      </div>
    );
  };
}

export default connect<IStateProps, IDispatchProps, IOwnProps>(
  (state: IApplicationStore): IStateProps => ({
    isPinging: state.ping.isPinging,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        testAction,
      },
      dispatch
    )
)(Home);
