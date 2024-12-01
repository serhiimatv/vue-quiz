import { toast } from 'vue3-toastify'

const useNotification = () => {
  const errorNotification = (message: string, duration?: number) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: duration ?? 3000,
    })
  }

  return {
    errorNotification,
  }
}

export default useNotification
