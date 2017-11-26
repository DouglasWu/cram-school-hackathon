module.exports = () => {
  let ListData = []
  let ShowData = []

  const initSearch = (keyword) => {
    if (keyword !== 'undefined') { $('#search_box').val(keyword) }

    $('#search_box').on('keydown', (e) => {
      if (e.keyCode === 13) {
        window.location = `${window.location.origin}${window.location.pathname}?keyword=${$('#search_box').val()}`
      }
    })
  }

  const getData = () => {
    $.ajax({
      url: './data/cramschool_list.json',
      type: 'get',
      async: false
    }).done(data => {
      ListData = data
    })
  }

  // const changeCate = () => {
  //   $('#item_filter select').change(function () {
  //     const thisVal = $(this).val()
  //     const matchText = thisVal === '所有類別/科目' ? '' : thisVal
  //     ShowData = ListData.filter(value => {
  //       return value['補習班類別/科目'].indexOf(matchText) > -1
  //     })
  //     showList(ShowData)
  //   })
  // }
  // changeCate()

  const showItem = () => {
    const get = () => {
      const name = decodeURIComponent(window.location.search.split('=')[1])

      for (let i = 0, len = ListData.length; i < len; i++) {
        if (ListData[i]['補習班名稱'] === name) {
          ShowData = ListData[i]
          break
        }
      }
    }

    get()

    new Vue({
      el: '#School',
      data: {
        item: ShowData
      }
    })

    // const show = () => {
    //   $('.item_name').html(ShowData['補習班名稱'])
    //   $('.item_phone .item_data').html(ShowData['電話'])
    //   $('.item_subject .item_data').html(ShowData['補習班類別/科目'])
    //   // $('.item_registered .item_data').html(ShowData['立案情形'])
    // }
    // show()
  }

  const showList = (opt) => {
    if (opt.page === 'index') {
      new Vue({
        el: opt.el,
        data: {
          selected: '所有類別/科目',
          data: opt.data
        },
        methods: {
          link: function (text) {
            return './School.html?name=' + text
          },
          pos: function(item) {
            if ("評價" in item) {
              return { width: item["評價"]['rate'][0] + '%' }
            }
            return { width: 0 };
          },
          mid: function() {
            if ("評價" in item) {
              return { width: item["評價"]['rate'][0] + '%' }
            }
            return { width: 0 };
          },
          neg: function() {
            if ("評價" in item) {
              return { width: item["評價"]['rate'][0] + '%' }
            }
            return { width: 0 };
          }
        },
        computed: {
          items: function () {
            const thisVal = this.selected
            const matchText = thisVal === '所有類別/科目' ? '' : thisVal

            return this.data.filter(value => {
              // value.url = './School.html?name=' + value['補習班名稱']
              return value['補習班類別/科目'].indexOf(matchText) > -1
            })
          }
        }
      })
    } else if (opt.page === 'other') {
      new Vue({
        el: opt.el,
        data: {
          items: opt.data
        },
        methods: {
          link: function (text) {
            return './School.html?name=' + text
          },
          pos: function(item) {
            if ("評價" in item) {
              return { width: item["評價"]['rate'][0] + '%' }
            }
            return { width: 0 };
          },
          mid: function() {
            if ("評價" in item) {
              return { width: item["評價"]['rate'][0] + '%' }
            }
            return { width: 0 };
          },
          neg: function() {
            if ("評價" in item) {
              return { width: item["評價"]['rate'][0] + '%' }
            }
            return { width: 0 };
          }
        }
      })
    }
  }

  getData()

  if ($('#Index').length > 0) {
    ShowData = ListData
    showList({
      page: 'index',
      el: '#Index',
      data: ShowData
    })
  }

  if ($('#Favorite').length > 0) {
    ShowData = ListData
    showList({
      page: 'other',
      el: '#Favorite',
      data: ShowData
    })
  }

  if ($('#Search').length > 0) {
    const keyword = decodeURIComponent(window.location.search.split('=')[1])

    if (keyword.indexOf('違規') > -1) {
      ShowData = ListData.filter(value => {
        return value['違規紀錄'].length > 0
      })
    } else if (keyword) {
      ShowData = ListData.filter(value => {
        return value['補習班名稱'].indexOf(keyword) > -1
      })
    }

    showList({
      page: 'other',
      el: '#Search',
      data: ShowData
    })

    initSearch(keyword)
  }

  if (window.location.href.indexOf('School') > -1) {
    showItem()
  }
}
