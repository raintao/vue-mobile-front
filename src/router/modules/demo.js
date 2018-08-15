
function getView(viewName) {
    return (resolve, reject) => {
        require.ensure([], (require) => {
            resolve(require(`src/views/page/demo/${viewName}`))
        }, reject, 'demo')
    }
}

let routes = [
    {
        name: 'demo',
        path: '/demo',
        meta: {
            title: 'demo'
        }
    }, {
        name: 'list',
        path: '/list',
        meta: {
            title: '列表demo'
        }
    }
]

routes.forEach((v) => {
    if (!v.redirect && !v.component) {
        v.component = getView(v.name)
    }
})

export default routes
