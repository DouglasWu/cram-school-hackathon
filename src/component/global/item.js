module.exports = () => {
  $('.item_delete').click(function () {
    const $content = $(this).closest('.item_content')
    const $item = $(this).closest('.item')
    $content.slideUp(() => { $item.remove() })
  })
}
