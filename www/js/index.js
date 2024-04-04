/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    async function initDatabase() {
        try {
            var db = window.sqlitePlugin.openDatabase({name: 'CyncSafe.db', location: "default"});
            alert (cordova.file.applicationDirectory + 'www/schema.spsql');
            // Resolve the local file system URL for the schema file
            window.resolveLocalFileSystemURL('file://' + cordova.file.applicationDirectory + 'www/schema.spsql', function(fileEntry) {
                fileEntry.file(function(file) {
                    var reader = new FileReader();
                    reader.onloadend = function() {
                        // File contents are in this.result
                        var schema = this.result;
                        
                        // Execute the schema in the database
                        db.exec(schema, function() {
                           alert("executed Schema")
                            window.console.log('Schema executed successfully');
                        }, function(error) {
                            alert("Error occured")
                            window.console.error('Error executing schema:', error);
                        });
                    };
                    
                    // Read the file as text
                    reader.readAsText(file);
                }, function(error) {
                    window.console.error('Error reading file:', error);
                });
            }, function(error) {
                window.console.error('Error resolving file URL:', error);
            });
        } catch (error) {
            window.console.error('Error initializing database:', error);
        }
    }    
      
    initDatabase();

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

  
}



   