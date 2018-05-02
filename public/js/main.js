// global $

$(document).ready(() => {
  const $editStrengthTrigger = $('.js-strength-edit-trigger')
  const $cancelStrengthTrigger = $('.js-strength-cancel-trigger')

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  const toggleStrength = ({currentCard, method = 'hide'}) => {
    const methods = method === 'edit' ? {form: 'removeClass', trigger: 'addClass'} : {form: 'addClass', trigger: 'removeClass'}
    currentCard.find('.js-strength-form')[methods.form]('d-none')
    currentCard.find('.js-strength-static, .js-strength-edit-trigger')[methods.trigger]('d-none')
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
