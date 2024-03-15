//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

//https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

const imgCaptions = [`"Clyde’s Spot" on Jupiter`, `Jupiter's Magnificent Swirling Clouds`, `Churning Texture in Jupiter’s Atmosphere`, 
`Cyclones of Color at Jupiter’s North Pole`, `Giant Storms and High Clouds`];

// compute position for pop up relative hover object
function compPos(obj) {
  const rect = obj.getBoundingClientRect();
  
  const top = rect.top;
  return [rect.left, top];
}

// process return
function showWindow(idHover, message) {
  const img = document.querySelector(`[data-image-id="${idHover}"]`);

  console.log(img);
  // derive location for pop up
  const loc = compPos(img);
  const left = `${loc[0]}px`;
  const top = `${loc[1]}px`;

  // create pop up
  const div = document.createElement('popup');
  div.id = 'popup';
  const txt = document.createTextNode(message);
  div.appendChild(txt);

  // style pop up
  div.setAttribute('class', 'popup');
  div.setAttribute('style', `position: fixed; left: ${left}; top: ${top}`);
  document.body.appendChild(div);
}

function removeWindow() {
  const popup = document.getElementById('popup');
  if (popup) popup.parentNode.removeChild(popup);
}

window.onload = () => {
  const imgs = document.querySelectorAll('img');
  imgs.forEach(img => {
    img.addEventListener(
      'mouseover',
      () => {

        let imgId = img.dataset.imageId;
        showWindow(imgId, imgCaptions[imgId]);
      });

    img.addEventListener(
      'mouseout',
      () => {
        removeWindow();
      });

    img.addEventListener('click', () => {

      //set the image to view in session storage so I can grap in in the other page
      let imgId = img.dataset.imageId;
      showWindow(imgId, imgCaptions[imgId]);
      sessionStorage.setItem('imageCaption', imgCaptions[imgId]);

      sessionStorage.setItem('imageToView', img.src);
      document.location = './cool-image-viewer.html';
    })
  });
};
