module.exports = () => {
  // toggle leftaside
  $('#navigation_button').click(() => {
    $('#leftaside').toggleClass('_open')
  })

  // webview
  $('#webview_topbar_close').click(() => {
    $('#webview').css({ top: '100%' })

    setTimeout(() => {
      $('#webview').css({
        left: '',
        top: '',
        visibility: ''
      }).find('iframe').remove()
    }, 500)
  })

  $('body').on('click', '[data-iframe]', function (e) {
    e.preventDefault()

    $(`<iframe src="${$(this).attr('href')}" frameborder="0" id="myFrame"></iframe>`)
     .appendTo('#webview_main')

    $('#webview').css({ left: '0', visibility: 'visible' })
  })
}
