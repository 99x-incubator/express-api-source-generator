```                                          
 _____  _   _  ____    ____  _____   ___   ___  
| ___ |( \ / )|  _ \  / ___)| ___ | /___) /___) 
| ____| ) X ( | |_| || |    | ____||___ ||___ | 
|_____)(_/ \_)|  __/ |_|    |_____)(___/ (___/  
              |_|                               
                                                
         _                    _                 
  ___  _| |_  _____   ____  _| |_  _____   ____ 
 /___)(_   _)(____ | / ___)(_   _)| ___ | / ___)
|___ |  | |_ / ___ || |      | |_ | ____|| |    
(___/    \__)\_____||_|       \__)|_____)|_|    
                                  
```

Use the `express-starter` tool to quickly bootstrap an Express application skeleton.

You can run the tool with the `npx` command.
```
$ npx @anjulalk/express-starter
```

You can also install the tool as a global `npm` package and then run it as well.
```
$ npm install @anjulalk/express-starter
$ express-starter
```

Refer the following section for a description of command options you can use.
```
Usage: express-starter [options] [name]

Options: 

         --template           choose a template to use in your project
                              default: standard template with view engine support
                              basic: standard template without view engine support
                              basic-auth: basic authentication boilerplate (https://github.com/ylorenzana/node-express-api-auth)
         --desc               set project description
     -g, --git                initialize a git repository
                              also fetches a suitable .gitignore file
     -i, --install            install project dependencies
     -y, --yes                skip prompts and use default values     
```
