import _ from 'lodash';
import printme from './print';
import './style.css';
import Icon from './sunset.jpg';
function component() {
    let element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    var image = new Image();
    image.src = Icon;
    element.appendChild(image);
    printme();
    return element;
  }
  
  document.body.appendChild(component());