import asyncio
import websockets
import random
from http import HTTPStatus
import dashscope


# 字典
messages = []
# 上下文长度
max_len = 20
dashscope.api_key='sk-055423e7ed8f4db0b324b4cff3caafa4'
def call_with_messages(message):
    # 如果 messages 长度达到 max_messages，移除最旧的消息
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
        messages.append({'role': response.output.choices[0]['message']['role'],
                        'content': response.output.choices[0]['message']['content']})
        return response.output.choices[0].message.content  # 假设响应内容是JSON格式
    else:
        print('Request id: %s, Status code: %s, error code: %s, error message: %s' % (
            response.request_id, response.status_code,
            response.code, response.message
        ))
        return 'Error occurred'  # 或者根据需要返回一个错误信息或特定值

async def handle_model_interaction(websocket, path):
    async for message in websocket:
        # 假设的模型处理函数
        response = call_with_messages(message)
        await websocket.send(response)
       

start_server = websockets.serve(handle_model_interaction, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
