module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/vue-todo-with-ts/'
        : '/',
    outputDir: 'docs',
}
