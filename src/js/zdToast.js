import { toast } from '@zerodevx/svelte-toast'
export const zdToast = (msg = "", type = 1) => {
    let success = {
        '--toastBackground': '#48BB78',
        '--toastBarBackground': '#2F855A'
    }
    let danger = {
        '--toastBackground': '#F56565',
        '--toastBarBackground': '#C53030'
    }
    let theme = type == 1 ? success : danger
    toast.push(msg, { theme })
}