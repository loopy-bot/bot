   
from flask import Flask, request, jsonify, send_file, Response
import random
from http import HTTPStatus
import dashscope
import json
from urllib.parse import urlparse, unquote
from pathlib import PurePosixPath
import broadscope_bailian
import requests
from dashscope.audio.tts import SpeechSynthesizer
from dashscope import ImageSynthesis

# 打开并读取JSON文件
with open('config.json', 'r') as f:
    # 使用json.load方法将文件内容解析为Python字典或列表
    config = json.load(f)

app = Flask(__name__)

dashscope.api_key = config['QWEN_KEY']

@app.route('/chat', methods=['POST'])
def chat():
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

@app.route('/audio',methods=['POST'])
def app_video():
    data = request.json
    prompt = data.get('prompt')
    if not prefix or not prompt:
        return jsonify({'error': 'Missing prefix or prompt'}), 400
    messages = [{'role': 'user', 'content': prompt}]
    response = dashscope.Generation.call(
        dashscope.Generation.Models.qwen_max,
        messages=messages,
        seed=random.randint(1, 10000),
        result_format='message',
    )
    if response.status_code == HTTPStatus.OK:
        content = response.output.choices[0].message.content
        binary_data = SpeechSynthesizer.call(
            model='sambert-zhiya-v1',
            text=content,
            sample_rate=48000,
            format='wav')
        if binary_data.get_audio_data() is not None:
            return Response(binary_data.get_audio_data(), mimetype='audio/wav')
        else:
            return jsonify({
                'error_message': '音频错误'
             }), response.status_code
    else:
        return jsonify({
            'request_id': response.request_id,
            'status_code': response.status_code,
            'error_code': response.code,
            'error_message': response.message
        }), response.status_code
    
@app.route('/draw',methods=['POST'])
def draw():
    data = request.json
    prompt = data.get('prompt')
    rsp = ImageSynthesis.call(model=ImageSynthesis.Models.wanx_v1,
                              prompt=prompt,
                              n=1,
                              size='1024*1024')
    if rsp.status_code == HTTPStatus.OK:
        return jsonify(rsp.output.results)
    else:
        print('Failed, status_code: %s, code: %s, message: %s' %
              (rsp.status_code, rsp.code, rsp.message))

if __name__ == '__main__':
    app.run(debug=True,port=8766,host='0.0.0.0')
