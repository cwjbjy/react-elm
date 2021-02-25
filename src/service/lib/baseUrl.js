let baseUrl = null; //权限接口


if (process.env.NODE_ENV === 'development') {
    baseUrl = 'https://elm.cangdu.org';
} else {
    baseUrl = 'https://elm.cangdu.org';
}

export {
    baseUrl,
}