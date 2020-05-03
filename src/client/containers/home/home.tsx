import { Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import snackbar from '../../common/utilities/snackbar';
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

const Home: React.FC<IOwnProps & IStateProps & IDispatchProps> = ({
  testAction,
  isPinging = false,
}) => {
  const handleOnclick = React.useCallback(() => {
    testAction(5);
    snackbar.show('This is a test 01');
    snackbar.show({ message: 'This is a test 02', actionLabel: 'undo' });
  }, [testAction]);

  return (
    <div>
      <h1>is pinging: {isPinging.toString()}</h1>
      <Button color="primary" onClick={handleOnclick} variant="contained">
        Test
      </Button>
    </div>
  );
};

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
