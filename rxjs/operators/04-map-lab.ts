import { fromEvent } from 'rxjs';
import { tap, map } from 'rxjs/operators';

const scroll$ = fromEvent(document, 'scroll');

const body = document.querySelector('body');

const texto = `
  Proident ex duis laborum fugiat esse velit eu proident. Adipisicing commodo laborum qui veniam minim in nulla Lorem ut incididunt enim sunt aliquip eiusmod. Ea voluptate anim aute excepteur duis ipsum cillum magna irure labore occaecat labore do et. Duis do officia mollit nulla cillum labore velit proident sit irure fugiat enim. Tempor adipisicing id ipsum aliquip ea elit voluptate incididunt tempor. Aliquip eu ea nostrud id occaecat est.
  <br /><br />
  Proident ex duis laborum fugiat esse velit eu proident. Adipisicing commodo laborum qui veniam minim in nulla Lorem ut incididunt enim sunt aliquip eiusmod. Ea voluptate anim aute excepteur duis ipsum cillum magna irure labore occaecat labore do et. Duis do officia mollit nulla cillum labore velit proident sit irure fugiat enim. Tempor adipisicing id ipsum aliquip ea elit voluptate incididunt tempor. Aliquip eu ea nostrud id occaecat est.
  <br /><br />
  Proident ex duis laborum fugiat esse velit eu proident. Adipisicing commodo laborum qui veniam minim in nulla Lorem ut incididunt enim sunt aliquip eiusmod. Ea voluptate anim aute excepteur duis ipsum cillum magna irure labore occaecat labore do et. Duis do officia mollit nulla cillum labore velit proident sit irure fugiat enim. Tempor adipisicing id ipsum aliquip ea elit voluptate incididunt tempor. Aliquip eu ea nostrud id occaecat est.
  <br /><br />
  Proident ex duis laborum fugiat esse velit eu proident. Adipisicing commodo laborum qui veniam minim in nulla Lorem ut incididunt enim sunt aliquip eiusmod. Ea voluptate anim aute excepteur duis ipsum cillum magna irure labore occaecat labore do et. Duis do officia mollit nulla cillum labore velit proident sit irure fugiat enim. Tempor adipisicing id ipsum aliquip ea elit voluptate incididunt tempor. Aliquip eu ea nostrud id occaecat est.
  <br /><br />
  Proident ex duis laborum fugiat esse velit eu proident. Adipisicing commodo laborum qui veniam minim in nulla Lorem ut incididunt enim sunt aliquip eiusmod. Ea voluptate anim aute excepteur duis ipsum cillum magna irure labore occaecat labore do et. Duis do officia mollit nulla cillum labore velit proident sit irure fugiat enim. Tempor adipisicing id ipsum aliquip ea elit voluptate incididunt tempor. Aliquip eu ea nostrud id occaecat est.
`;

const section = document.createElement('div');
section.innerHTML = texto;
body.append(section);

const scrollBar = document.createElement('div');
scrollBar.style.position = 'fixed';
scrollBar.style.top = '0';
scrollBar.style.left = '0';
scrollBar.style.height = '5px';
scrollBar.style.width = '0%';
scrollBar.style.backgroundColor = '#9034AA';
body.append(scrollBar);

scroll$
  .pipe(
    map(event => {
      const { clientHeight, scrollHeight, scrollTop } = (event.target as any).documentElement;
      return (scrollTop / (scrollHeight - clientHeight)) * 100;
    }),
    tap(console.log)
  )
  .subscribe(percentage => {
    scrollBar.style.width = `${percentage}%`;
  });
