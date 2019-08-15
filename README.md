# Convert React Applications to Mendix widgets
This boilerplate can be used to convert created React applications to Mendix 7.x widgets

## Basic configuration setup
The Name of your Widget has to be specified in the package information.\
The Parameter `name` in the `package.json` file specifies the name of your Widget

```json
{
  "name": "CustomApplication",
  "entrypoint": "index",
  "version": "1.0.0",
  "description": "",
  ...
```
*In this example the name of the Widget has been set to CustomApplication*

<hr/>

The next step is to configure the information in the configuration file for the package in the file `src/config.xml`.


```xml
<?xml version="1.0" encoding="utf-8" ?>
<widget id="CustomApplication.widget.CustomApplication" needsEntityContext="false" xmlns="http://www.mendix.com/widget/1.0/">
    <name>CustomApplication</name>
    <description>CustomReactWidget for Mendix</description>

    <icon />

    <properties>
        <property key="dummyKey" type="string" required="false" defaultValue="">
            <caption>Dummy key</caption>
            <category>Appearance</category>
            <description>This key was added to make the widget work in the Modeler (needs atleast 1 key). Please change/remove this one</description>
        </property>
    </properties>
</widget>
```
Change the corresponding information in the configuration file to your specific widget information\
You have to configure the following tags:

### Widget id
The schema should be `applicationName.widget.applicationName`

```xml
<widget id="CustomApplication.widget.CustomApplication" needsEntityContext="false" xmlns="http://www.mendix.com/widget/1.0/">
```
*In this example the id is set to CustomApplication.widget.CustomApplication
where CustomApplication specifies the application name set in the package.json file*

### Name
Name of the widget
```xml
<name>CustomApplication</name>
```
*Application
where CustomApplication specifies the application name set in the package.json file*

### Description
Description for the widget
```xml
<description>CustomReactWidget for Mendix</description>
```

### Properties
You can define properties for the widget which can be set inside the Modeler.
```xml
    <properties>
        <property key="dummyKey" type="string" required="false" defaultValue="">
            <caption>Dummy key</caption>
            <category>Appearance</category>
            <description>This key was added to make the widget work in the Modeler (needs atleast 1 key). Please change/remove this one</description>
        </property>
    </properties>
```
<hr>
The last configuration step is to specify the entry point of your Application. 

To do this you have to past your React application into the widget folder.
Place the source files of your application into the folder `src/widget/`

Open the `index.js` file which is located inside the folder.

```jsx
import declare from 'dojoBaseDeclare';
import widgetBase from 'widgetBase';
import * as packageConfig from '../../package.json';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import YourApplication from './YourApplication.jsx';

declare(packageConfig.name + ".widget." + packageConfig.name, [widgetBase], {

    constructor: function (params, srcNodeRef) {
        this.domNode = srcNodeRef;
        ReactDOM.render(<YourApplication/>, this.domNode);
    },

    update: function (obj, cb) {
        cb();
    },
});
```

Change the following lines to specify your project

Replace the import of `YourApplication` with the import path of your component
```jsx
import YourApplication from './YourApplication.jsx';
```

Replace `YourApplication` with your component name
```jsx
    constructor: function (params, srcNodeRef) {
        this.domNode = srcNodeRef;
        ReactDOM.render(<YourApplication/>, this.domNode);
    },
```
<hr/>

## Build the widget
After you have finished the setup you are able to build the widget.

Open the Terminal (CMD) and change the directory to the base directory of this module.

First you have to install all the required node packages.
Use the command: 
```sh
npm install
```

You can now build your widget with the command: 
```sh
npm run build
```

This will build the application and create a `widgets.mpk` file inside the `/build` directory.
<hr/>

## Deploy the widget
You can move the created `widget.mpk` file into the `/widgets` directory of your Mendix application.\
It will be accessible in the Modeler in the `Add-on widgets` section.
