// global $

$(document).ready(() => {
  const $editStrengthTrigger = $('.js-strength-edit-trigger')
  const $cancelStrengthTrigger = $('.js-strength-cancel-trigger')

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  const toggleStrength = ({currentCard, method = 'hide'}) => {
    const methods = method === 'edit' ? {form: 'removeClass', trigger: 'addClass'} : {form: 'addClass', trigger: 'removeClass'}
    const value = Number(currentCard.find('.js-strength-value').val())
    currentCard.find('.js-strength-form')[methods.form]('d-none')
    currentCard.find('.js-strength-static, .js-strength-edit-trigger')[methods.trigger]('d-none')
    currentCard.find('.form-control').val(value)
  }

  $editStrengthTrigger.on('click', (e) => {
    e.preventDefault()
    const currentCard = $(e.target).closest('.js-card-form')
    toggleStrength({currentCard, method: 'edit'})
  })

  $cancelStrengthTrigger.on('click', (e) => {
    e.preventDefault()
    const currentCard = $(e.target).closest('.js-card-form')
    toggleStrength({currentCard})
  })
})
