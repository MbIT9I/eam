module.exports = {
    client: {
      service: {
        name: 'eam',
        // URL to the GraphQL API
        url: 'https://service.harwind.com.ua/eam-web-graphql/api/graphql',
        headers: {
            "Schema": "_EAMSERVICE"
        }
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
      ],
    },
  }