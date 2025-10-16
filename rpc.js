import { formatHex } from 'culori/fn'

import { inRGB, toRgb } from './lib/colors.js'
import { onCurrentChange, setCurrent, valueToColor } from './stores/current.js'

window.addEventListener('message', (event) => {
  if (!event.data || !event.data.oklch_picker) {
    return
  }
  switch (event.data.type) {
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
