# Copyright 2015 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START app]

from flask import Flask, render_template, request
from flask_json import FlaskJSON, JsonError, json_response, as_json

app = Flask(__name__)
json = FlaskJSON(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chart', methods=['POST'])
def chart():
    """ Do something that will update the Firebase Storage """

@app.route('/ml', methods=['POST'])
def ml():
    data = request.get_json()
    """
    Do some classification here
    """
    return json_response(label="Some_Label that you classified.")


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080)
# [END app]
