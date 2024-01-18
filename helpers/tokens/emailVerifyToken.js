const generateEmailToken = () => Math.random().toString(36).substring(2) + Date.now().toString(32);

export {
    generateEmailToken
}