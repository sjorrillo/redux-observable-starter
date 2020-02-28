import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { testAction } from '../../state/stores/ping/ping-action';

interface IHomeProps {
  isPinging: boolean;
}

interface IHomeActions {
  testAction(): void;
}

@connect(
  (state): IHomeProps => ({
    isPinging: state.ping.isPinging,
  }),
  dispatch =>
    bindActionCreators(
      {
        testAction,
      },
      dispatch
    )
)
export class Home extends React.Component<IHomeProps & IHomeActions, object> {
  handleOnclick = () => {
    const { testAction } = this.props;
    testAction();
  };

  render = ({ isPinging = false }: IHomeProps = this.props): JSX.Element => {
    return (
      <div>
        <h1>is pinging: {isPinging.toString()}</h1>
        <button onClick={this.handleOnclick}>Test</button>
      </div>
    );
  };
}
