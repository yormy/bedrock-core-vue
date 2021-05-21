# update system

## Setup host system

```
npm install -g npm@latest
npm install -g npm-check-updates
```

# Create new project

Package.json the name of the project needs to be in the

* main : ```"main": "./dist/bedrock<NAME>.common.js",```
* build : ```"build": "vue-cli-service build --target lib --name <NAME> src/main.js"```

# Build

```npm run build```

# check for updates

ncu
