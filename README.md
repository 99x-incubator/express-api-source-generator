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
# Introduction

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

# Usage
Refer the following section for a description of command options you can use.
```
Usage: express-starter [options] [name]

Options: 

         --template           choose a template to use in your project
                              default: standard template with view engine support
                              basic: standard template without view engine support
                              basic-auth: basic authentication boilerplate ()
         --desc               set project description
     -g, --git                initialize a git repository
                              also fetches a suitable .gitignore file
     -i, --install            install project dependencies
     -y, --yes                skip prompts and use default values     
```
# Templates
|       Name | Description                                                                                                                                                                                                           |
|-----------:|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    Default | Same as basic template but includes `ejs` view engine support                                                                                                                                                         |
|      Basic | Basic template suitable for most Express applications. Ideal for developing REST APIs. Doesn't contain view engine support.                                                                                           |
| basic-auth | Authentication boilerplate based on [ylorenzana/node-express-api-auth](https://github.com/ylorenzana/node-express-api-auth) template. Suitable for developing REST APIs. Requires mongoDB database server to operate. |

# License

The MIT License (MIT)

Copyright 2020 Anjula Karunarathne

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.