import { getCurrentWindow, PhysicalSize } from '@tauri-apps/api/window'

String.prototype.capitaliseFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

export const initialiseApplication = async () => {
  await getCurrentWindow().setMinSize(new PhysicalSize(700, 400))
}
