import Vue from 'vue'
import moment from 'moment'

Vue.filter('dataFormat', function (dateStr, patten = "YYYY-MM-DD HH:mm") {
    return moment(dateStr).format(patten);
})

Vue.filter('dateChineseFormat',function (dataStr,patten = "YYYY年MM月DD日") {
    return moment(dataStr).format(patten);
})
