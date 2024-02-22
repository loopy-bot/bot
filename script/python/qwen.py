import random
from http import HTTPStatus
import dashscope
import sys

dashscope.api_key='sk-055423e7ed8f4db0b324b4cff3caafa4'
def call_with_messages(prefix,prompt):
    messages = [
        {'role': 'user', 'content': prefix + prompt}]
    response = dashscope.Generation.call(
        # 'qwen1.5-72b-chat',
        dashscope.Generation.Models.qwen_max,
        messages=messages,
        # set the random seed, optional, default to 1234 if not set
        seed=random.randint(1, 10000),
        result_format='message',  # set the result to be "message" format.
    )
    if response.status_code == HTTPStatus.OK:
        print(response)
    else:
        print('Request id: %s, Status code: %s, error code: %s, error message: %s' % (
            response.request_id, response.status_code,
            response.code, response.message
        ))

if __name__ == '__main__':
    if len(sys.argv) != 3:
        # print()
        print("Usage: python script.py <prefix> <prompt>")
        sys.exit(1)
    
    prefix = sys.argv[1]
    prompt = sys.argv[2]
    
    call_with_messages(prefix, prompt)