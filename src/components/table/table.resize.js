import {$} from '@core/Dom';

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords();
    const typeOfResize = $resizer.data.resize
    const sideProp = (typeOfResize === 'col') ? 'bottom' : 'right'
    let value

    const col = $parent.data.col

    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px',
    })

    document.onmousemove = evt => {
      if (typeOfResize === 'col') {
        const delta = evt.pageX - coords.right
        value = coords.width + delta
        $resizer.css({right: -delta + 'px'})
      } else {
        const delta = evt.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({bottom: -delta + 'px'})
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      if (typeOfResize === 'col') {
        $parent.css({width: value + 'px'})
        $root.findAll(`[data-col="${col}"]`)
            .forEach( element => {
              element.style.width = value + 'px'
            })
      } else {
        $parent.css({height: value + 'px'})
      }

      resolve({
        value,
        id: typeOfResize === 'col' ? $parent.data.col : null,
      })

      $resizer.css({
        opacity: 0,
        bottom: '0px',
        right: '0px',
      })
    }
  })
}

