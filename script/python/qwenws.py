import asyncio
import websockets
import random
from http import HTTPStatus
import dashscope
import json

# 使用字典来存储不同key的消息队列
messages_dict = {}
# 上下文长度
max_len = 20
dashscope.api_key='sk-055423e7ed8f4db0b324b4cff3caafa4'

def call_with_messages(key, message):
    # 确保每个key都有自己的消息列表
    if key not in messages_dict:
        messages_dict[key] = []
    
    # 获取当前key的消息列表
    messages = messages_dict[key]

    # 如果 messages 长度达到 max_len，移除最旧的消息
    if len(messages) >= max_len:
        messages.pop(0)

    messages.append({'role': 'user', 'content': message})
   
    response = dashscope.Generation.call(
        dashscope.Generation.Models.qwen_max,
        messages=messages,
        seed=random.randint(1, 10000),
        result_format='message',
    )
    
    if response.status_code == HTTPStatus.OK:
        output_message = response.output.choices[0]['message']['content']
        messages.append({'role': 'assistant', 'content': output_message})
        # 更新字典中的消息队列
        messages_dict[key] = messages
        return output_message  # 假设响应内容是JSON格式
    else:
        print('Request id: %s, Status code: %s, error code: %s, error message: %s' % (
            response.request_id, response.status_code,
            response.code, response.message
        ))
        return 'Error occurred'  # 或者根据需要返回一个错误信息或特定值

async def handle_model_interaction(websocket, path):
    async for message in websocket:
        data = json.loads(message)
        text = data['text']
        key = data['key']

        # 将消息发送到处理队列
        await process_message(key, text, websocket)

async def process_message(key, text, websocket):
    loop = asyncio.get_running_loop()
    # 在线程池中执行同步的 call_with_messages 函数
    response = await loop.run_in_executor(None, call_with_messages, key, text)
    print(response)
    # 发送响应回客户端
    await websocket.send(json.dumps({'key': key, 'response': response}))

start_server = websockets.serve(handle_model_interaction, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
