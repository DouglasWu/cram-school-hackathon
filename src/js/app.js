import helloWorld from '../component/global/helloWorld'
import navigation from '../component/template/navigation'
import list from '../component/global/list'
import item from '../component/global/item'
import loadMap from '../component/global/loadMap'

$('document').ready(() => {
  helloWorld()
  navigation()
  item()

  if ($('#Map').length > 0) {
    loadMap('Map')
  }

  if ($('#item_list').length > 0 || window.location.href.indexOf('School') > -1) {
    list()
  }
})
