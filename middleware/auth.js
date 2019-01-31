import axios from 'axios'

export default (context) => {
  var token = context.app.context.app.$cookies.get('_token');
  var userId = context.app.context.app.$cookies.get('_userId');

  if (!token) {
    if (userId) {
      context.app.context.app.$cookies.remove('_userId');
    }
    return context.redirect('/login')
  } else {
    return axios.get('https://api.quwi.com/v2/auth/init', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      if (response.status && response.status == 401 || response.data.user.id != userId) {
        context.app.context.app.$cookies.remove('_token');
        context.app.context.app.$cookies.remove('_userId');
        return context.redirect('/login')
      }
    }).catch(error => {
      context.app.context.app.$cookies.remove('_token');
      context.app.context.app.$cookies.remove('_userId');
      return context.redirect('/login')
    })
  }
}
