const useValidationRules = () => {
  const required = (value: string) => !!value || 'Поле не може бути порожнім'

  const duplicateAnswer = (optionList: string[]) => {
    return (value: string) => {
      if (value) {
        return (
          !optionList.find((option) => option.toLocaleLowerCase() === value.toLocaleLowerCase()) ||
          'Така відповідь вже існує'
        )
      }
      return true
    }
  }

  return {
    required,
    duplicateAnswer,
  }
}

export default useValidationRules
