import * as React from 'react';

interface IHomeProps {}

interface IHomeActions {}

export class Tacos extends React.Component<IHomeProps & IHomeActions, object> {
  render = (): JSX.Element => {
    return (
      <div>
        <h1>Tacos</h1>
      </div>
    );
  };
}
