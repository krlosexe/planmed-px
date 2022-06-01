
// const server1 = 'http://192.168.1.120:8000/api'
// const file_server1 =  'http://192.168.1.120:8000'


const Api = 'https://pdtclientsolutions.com/crm-public/api' //daniel correa 
//pielis 'https://pdtclientsolutions.com/ventascc/api'
//const serverQa = 'http://pdtclientsolutions.com/crm-public.dev/api'
const file_server1 = 'https://pdtclientsolutions.com/crm-public' // daniellcorrea  
//pielis 'https://pdtclientsolutions.com/ventascc'


const postsServer = 'http://pdtclientsolutions.com:3020'
const postsRestServer1 = 'http://pdtclientsolutions.com:3020/api'
//  const postsServer = 'http://192.168.1.60:3020'


const prpManagementServer = 'http://pdtclientsolutions.com:3030'
// const prpManagementServer = 'http://192.168.1.60:3030'

const token_wompi = "pub_prod_rwKB9ijLiYH3kv2ym9DJBO0zYUumNVat"
//const token_wompi = "pub_test_BXyO9ir35wRqmSxkcMYg0kEadlvN2z4Y"

const ApiWompi = "https://production.wompi.co/v1/"
//const ApiWompi = "https://sandbox.wompi.co/v1/"


const base_url = function base_url(server, uri){
    return `${server}/${uri}`
}



export  {
    base_url,
    Api,
    postsServer,
    prpManagementServer,
    file_server1,
    postsRestServer1,
    token_wompi,
    ApiWompi,
}