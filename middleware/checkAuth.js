import axios from 'axios'

export default (context) => {
  var token = context.app.context.app.$cookies.get('_token');
  var userId = context.app.context.app.$cookies.get('_userId');

  if (token) {
    return axios.get('https://api.quwi.com/v2/auth/init', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      if (response.data.user &&  response.data.user.id == userId) {
        return context.redirect('/home');
      } else{
        context.app.context.app.$cookies.remove('_token');
        context.app.context.app.$cookies.remove('_userId');
      }
    }).catch(error => {
      context.app.context.app.$cookies.remove('_token');
      context.app.context.app.$cookies.remove('_userId');
    })
  }
}
