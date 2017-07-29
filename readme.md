# Rest-Your-Self
## Yet another Restful-API mock server


Sometimes you need to have your services mocked very fast to start implementig your client side code immediatly, with `restyoutself` you will be able to design your service mock signitures just in a second.

### 0. Features
* Dynamic/Customizable API url routing and parameter defenition
* Custom headers
* Dynamic response body design using Plain-Text/Json/Javascript function/EJS Templating


### 1. Installation
Just clone this repo and run gulp and node commands in this order
```bash
$ git clone https://gitlab.com/bg.nima/restyourself

$ cd restyourself

$ npm install

$ bower install
```


### 2. Running Server
```bash
# developement mode
$ gulp dev --adminport 8989 --restport 3100 --localip 127.0.0.1

# distribution mode
$ gulp dist --adminport 8989 --restport 3100 --localip 127.0.0.1
```
These two commands accept three input arguments. `restyourself` consists of two different servers. One for Admin UI and mock service configuration manging and one for providing mock services according to your needs wich can be run in a seprate service/thread/port. You can pass Admin Server Port through **adminport** argument which by default is **8989** and set Service Mock Server port through **restport** argument which has **3100** as default value.


### 3. Advanced Production Distribution (Docker)
There is a **Dockerfile** provided within this repo. You can use that docker image file to create and run your docker container.
```bash
# build your app image from Dockerfile
$ docker build -t restyoutself:dist .

# run your image and map ports
$ docker run -d -p 3100:3100 -p 8989:8989 --name restyourself-container restyourself:dist
```
