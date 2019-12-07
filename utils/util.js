const formatTime = function(timestamp) {
  let date = new Date(timestamp)
  // const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()
  if (month < 10) {
    month = '0' + month
  } else {
    month = month
  }
  if (day < 10) {
    day = '0' + day
  } else {
    day = day
  }
  return month + '-' + day
}




module.exports = {
  formatTime: formatTime
}