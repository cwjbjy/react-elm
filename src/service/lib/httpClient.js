import qs from 'qs'

class FetchClient {
    constructor() {
        this.headers = {}; //预留字段
        this.token = '';
    }
    /**
     * 请求拦截器
     * 功能：请求配置
     */
    interceptorsRequest(url, {
        method,
        data
    }) {
        let headers = {};
        let conf = {};
        if (method === 'GET' || method === 'HEAD' || method === 'DELETE') {
            data = qs.stringify(data, {
                arrayFormat: 'brackets'
            });
            url = `${url}?${data}`
        } else {
            //传输JSON数据格式
            if (Object.prototype.toString.call(data) !== '[object FormData]') {
                data = JSON.stringify(data)
            }
            conf = {
                body: data
            }
        }
        return {
            url,
            options: Object.assign({}, {
                method,
                headers
            }, conf)
        }
    }

    /**
     * 响应拦截器
     */
    interceptorsResponse(res) {
        return new Promise((resolve, reject) => {
            if (res.ok) {
                try {
                    return resolve(res.json());
                } catch {
                    return resolve({
                        status: 'ok'
                    })
                }
            }
            reject(res)
        })
    }

    /**
     * 请求工厂
     */
    async httpFactory(url = '', {
        data = null,
        method
    }) {
        let req = await this.interceptorsRequest(url, {
            data,
            method
        }); //请求拦截
        let res = await window.fetch(req.url, req.options); //网络请求
        let rst = await this.interceptorsResponse(res);
        return rst
    }

    async get(url, params) {
        return await this.httpFactory(url, {
            ...params,
            method: 'GET'
        })
    }

    async post(url, params) {
        return await this.httpFactory(url, {
            ...params,
            method: 'POST'
        })
    }

    async put(url, params) {
        return await this.httpFactory(url, {
            ...params,
            method: 'PUT'
        })
    }

    async delete(url, params) {
        return await this.httpFactory(url, {
            ...params,
            method: 'DELETE'
        })
    }

    async patch(url, params) {
        return await this.httpFactory(url, {
            ...params,
            method: 'PATCH'
        })
    }
}

export default new FetchClient()