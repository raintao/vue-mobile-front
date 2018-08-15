
function getView(viewName) {
    return (resolve, reject) => {
        require.ensure([], (require) => {
            resolve(require(`src/views/page/${viewName}`))
        }, reject, 'login')
    }
}

let routes = [
    {
        path: '',
        redirect: '/login'
    }, {
        name: 'login',
        path: '/login',
        meta: {
            title: '登录'
        }
    }
]

routes.forEach((v) => {
    if (!v.redirect && !v.component) {
        v.component = getView(v.name)
    }
})

export default routes
