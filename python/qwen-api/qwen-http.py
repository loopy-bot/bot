   
from flask import Flask, request, jsonify
import random
from http import HTTPStatus
import dashscope
import json

# 打开并读取JSON文件
with open('config.json', 'r') as f:
    # 使用json.load方法将文件内容解析为Python字典或列表
    config = json.load(f)

app = Flask(__name__)

dashscope.api_key = config['QWEN_KEY']

@app.route('/get',methods=['GET'])
def test():
    return 'hello'
@app.route('/chat', methods=['POST'])
def call_with_messages_chat():
    data = request.json
    messages = data.get('messages')
    if not messages:
        return jsonify({'error': 'Missing messages'}), 400
    response = dashscope.Generation.call(
        dashscope.Generation.Models.qwen_max,
        messages=messages,
        seed=random.randint(1, 10000),
        result_format='message',
    )
    if response.status_code == HTTPStatus.OK:
        return jsonify(response.output.choices[0].message.content)
    else:
        return jsonify({
            'request_id': response.request_id,
            'status_code': response.status_code,
            'error_code': response.code,
            'error_message': response.message
        }), response.status_code
@app.route('/generate', methods=['POST'])
def call_with_messages():
    data = request.json
    prefix = data.get('prefix')
    prompt = data.get('prompt')
    if not prefix or not prompt:
        return jsonify({'error': 'Missing prefix or prompt'}), 400
    messages = [{'role': 'user', 'content': prefix + prompt}]
    response = dashscope.Generation.call(
        dashscope.Generation.Models.qwen_max,
        messages=messages,
        seed=random.randint(1, 10000),
        result_format='message',
    )
    if response.status_code == HTTPStatus.OK:
        return jsonify(response.output.choices[0].message.content)
    else:
        return jsonify({
            'request_id': response.request_id,
            'status_code': response.status_code,
            'error_code': response.code,
            'error_message': response.message
        }), response.status_code

if __name__ == '__main__':
    app.run(debug=False,port=8766,host='0.0.0.0')
