import { formatHex } from 'culori/fn'

import { inRGB, toRgb } from './lib/colors.js'
import { onCurrentChange, setCurrent, valueToColor } from './stores/current.js'

setInterval(() => {
  if (!window.opener || window.opener.closed) {
    window.close()
  }
}, 500);

window.addEventListener('message', (event) => {
  if (!event.data || !event.data.oklch_picker) {
    return
  }
  switch (event.data.type) {
    case 'handshake':
      window.opener.postMessage({
        oklch_picker: true,
        type: 'handshake_response'
      }, '*');
      break;
    case 'set_color':
      setCurrent(event.data.color, true);
      break;
  }
})

onCurrentChange({
  lch(value) {
    let color = valueToColor(value)
    let rgbColor = inRGB(color) ? color : toRgb(color)
    let hex = formatHex(rgbColor)

    window.opener.postMessage({
      color: hex,
      oklch_picker: true,
      type: 'color_change'
    }, '*');
  }
})
