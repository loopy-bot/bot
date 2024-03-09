from http import HTTPStatus
from urllib.parse import urlparse, unquote
from pathlib import PurePosixPath
import requests
import dashscope



dashscope.api_key = ""



if __name__ == '__main__':
    simple_call()