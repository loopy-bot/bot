import os
import random
import broadscope_bailian


def test_third_model_completions():
    """ 三方模型应用示例 """

    access_key_id = 'LTAI5t6doYjmYRw1o1aLBjGi'
    access_key_secret = 'BapOXZypo0Ui2UR5ZdPucjVQunJYjl'
    agent_key = '305253770b4b4d409bb9d1dc4807427b_p_efm'
    app_id = '6277f1b270ec4b2282e45565dd597b0f'

    client = broadscope_bailian.AccessTokenClient(access_key_id=access_key_id, access_key_secret=access_key_secret,
                                                    agent_key=agent_key)
    token = client.get_token()


    chat_history = [
            {"user": "我想去北京", "bot": "北京是一个非常值得去的地方"}
        ]
    prompt = "那边有什么推荐的旅游景点"
    resp = broadscope_bailian.Completions(token=token).create(
        app_id=app_id,
        prompt=prompt,
        history=chat_history,
        
    )

    if not resp.get("Success"):
        print("failed to create completion, request_id: %s, code: %s, message: %s" %
                (resp.get("RequestId"), resp.get("Code"), resp.get("Message")))
    else:
        print("request_id: %s, text: %s" % (resp.get("RequestId"), resp.get("Data", {}).get("Text")))
        doc_references = resp.get("Data", {}).get("DocReferences")
        if doc_references is not None and len(doc_references) > 0:
            print("doc ref: %s" % doc_references[0].get("DocName"))
test_third_model_completions()