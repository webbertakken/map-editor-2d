import { appWindow, PhysicalSize } from '@tauri-apps/api/window'

export const initialiseApplication = async () => {
  await appWindow.setMinSize(new PhysicalSize(700, 400))
}
