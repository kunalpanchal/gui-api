
import Swal from 'sweetalert2'
export default {
    name: 'home',
    data() {
        return {
            apiMethodColors: {
                'GET': '#a5d6a7',
                'POST': '#ffab91',
                'DELETE': '#e6ee9c',
                'PATCH': '#f48fb1',
                'PUT': '#b0bec5'
            },
            exportedJSON: {
                name: 'My awesome api',
                language: 'javascript',
                compression: true,
                cors: false,
            },
            apis: [
                {
                    route: '/',
                    httpMethod: 'GET',
                },
                {
                    route: '/users/api',
                    httpMethod: 'POST',
                    cors: true,
                    code: `const a='hi'`,
                    rateLimiter: true,
                    httpParams: [],
                    httpQuery: [],
                    httpBody: [],
                },
                {
                    route: '/users/api/indexes',
                    httpMethod: 'GET'
                }
            ]
        }
    },
    methods: {
        addAPIFeatures: async function (api, index) {

            const { value: formValues } = await Swal({
                title: 'Enable',
                html:
                    `<div style="display: flex;flex-direction: column;">
                        ${!api.cors ? `<a class="waves-effect waves-light btn-small">CORS</a>` : ``}
                        ${!api.httpParams ? `<a class="waves-effect waves-light btn-small">Params</a>` : ``}
                        ${!api.httpQuery ? `<a class="waves-effect waves-light btn-small">Query</a>` : ``}
                        ${!api.httpBody ? `<a class="waves-effect waves-light btn-small">Body</a>` : ``}
                        ${!api.code ? `<a class="waves-effect waves-light btn-small">Code</a>` : ``}
                        ${!api.rateLimiter ? `<a class="waves-effect waves-light btn-small">Rate Limiter</a>` : ``}
                     </div>`,
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('swal-input1').value,
                        document.getElementById('swal-input2').value
                    ]
                }
            })

        },
        route: async function (api, index) {
            const { value: routeName } = await Swal({
                title: 'API route',
                input: 'text',
                inputPlaceholder: '/users/update',
                inputValue: api.route,
                showCancelButton: true,
                inputValidator: (value) => {
                    return this.apis.find((a, i) => a.route == value && i != index && a.httpMethod == api.httpMethod) ? 'API already exists' : undefined
                }
            })

            if (routeName)
                api.route = routeName

        },
        code: async function (api, index) {
            let sourcecode = `console.log('hello')`
            const { value: formValues } = await Swal({
                title: 'Enter the rate limiter values',
                html:
                    `<pre v-highlightjs="sourcecode"><code class="javascript"></code></pre>`,
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('swal-input1').value,
                        document.getElementById('swal-input2').value
                    ]
                }
            })
        },
        httpMethod: async function (api, index) {
            const { value: fruit } = await Swal({
                title: 'Select HTTP method',
                input: 'select',
                inputOptions: {
                    'POST': 'POST',
                    'DELETE': 'DELETE',
                    'GET': 'GET',
                    'PATCH': 'PATCH',
                    'PUT': 'PUT'
                },
                inputValue: api.httpMethod,
                showCancelButton: true,
                inputValidator: (value) => {
                    return this.apis.find((a, i) => a.route == api.route && i != index && a.httpMethod == value) ? 'API already exists' : undefined
                }
            })

            if (fruit)
                api.httpMethod = fruit
        },
        rateLimiter: async function () {


            // const {value: formValues} = await Swal({
            //   title: 'Enter the rate limiter values',
            //   html:
            //     `<input id="swal-input1" placeholder="inputtt" class="swal2-input">
            //       <input id="swal-input2" class="swal2-input">`,
            //   focusConfirm: false,
            //   preConfirm: () => {
            //     return [
            //       document.getElementById('swal-input1').value,
            //       document.getElementById('swal-input2').value
            //     ]
            //   }
            // })

            alert(formValues)
        },
        addNewAPI: async function () {
            const { value: routeName } = await Swal({
                title: 'API route',
                input: 'text',
                inputPlaceholder: '/users/update',
                showCancelButton: true,
                inputValidator: (value) => {
                    return this.apis.find((a, i) => a.route == value && a.httpMethod == 'GET') ? 'API already exists' : undefined
                }
            })

            if (routeName) {
                let api = JSON.parse(JSON.stringify(this.apis[0]))
                api.route = routeName
                this.apis.push(api)
            }
        }
    }
}