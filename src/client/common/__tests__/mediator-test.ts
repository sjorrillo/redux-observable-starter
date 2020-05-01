import { EventType, mediator } from '../modules/mediator';

describe('modules/mediator', () => {
  describe('when a we have a subscription to an event', () => {
    it('should listen any value that is emitted', () => {
      const subscriptionHandler = jest.fn(() => {});
      mediator.on(EventType.Login, {
        next: subscriptionHandler,
      });

      mediator.emit(EventType.Login, '1');
      mediator.emit(EventType.Login, '2');
      mediator.emit(EventType.Login, '3');

      expect(subscriptionHandler).toBeCalledTimes(3);
      expect([].concat(...subscriptionHandler.mock.calls)).toEqual(['1', '2', '3']);
    });
  });
});
